import { useState } from "react";
import axios from "axios";

export const usePdfParse = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [parsedText, setParsedText] = useState<string | null>(null);

  const parsePdf = async (file: File) => {
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/pdfParse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const text = response.data;

      // remove extra spaces and trim the lines
      const cleanedText = text.replace(/^\s*[\r\n]/gm, "");
      setParsedText(cleanedText);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, parsedText, parsePdf };
};
