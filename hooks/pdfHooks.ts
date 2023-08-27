import { useState } from "react";
import axios from "axios";
import { useUser } from "contexts/userContext";
import Filter from "bad-words";

export const usePdfParse = () => {
  const [error, setError] = useState<string | null>(null);
  const [parsedText, setParsedText] = useState<string | null>(null);
  const { setParsedPdfText, setIsFetching } = useUser();

  const parsePdf = async (file: File) => {
    setError(null);
    const filter = new Filter();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("/api/pdfParse", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const text = response.data;

      if (filter.isProfane(text)) {
        setError("The provided PDF contains inappropriate language.");
        alert("The provided PDF contains inappropriate language.");
        return false;
      }
      const cleanedText = text
        .replace(/\n/g, "<linebreak>")
        .replace(/^\s*[\r\n]/gm, "");

      setParsedText(cleanedText);
      return cleanedText;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setIsFetching(false);
    }

    return true;
  };

  return { error, parsedText, parsePdf };
};
