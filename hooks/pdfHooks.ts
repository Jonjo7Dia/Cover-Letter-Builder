import { useState } from "react";
import axios from "axios";
import { useUser } from "contexts/userContext";

export const usePdfParse = () => {
  const [error, setError] = useState<string | null>(null);
  const [parsedText, setParsedText] = useState<string | null>(null);
  const { setParsedPdfText, setIsFetching } = useUser();

  const parsePdf = async (file: File) => {
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
      const cleanedText = text
        .replace(/\n/g, "<linebreak>")
        .replace(/^\s*[\r\n]/gm, "");

      setParsedText(cleanedText);
      setParsedPdfText(cleanedText);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsFetching(false);
    }
  };

  return { error, parsedText, parsePdf };
};
