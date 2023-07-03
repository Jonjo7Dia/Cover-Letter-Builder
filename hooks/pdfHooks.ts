import { useState } from "react";
import axios, { AxiosError } from "axios";

interface PdfParseResponse {
  text: string;
  error?: string;
}

const usePdfParse = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<PdfParseResponse | null>(null);
  const [error, setError] = useState<AxiosError | null>(null);

  const parsePdf = async (file: File): Promise<PdfParseResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post<PdfParseResponse>(
        "/api/pdfParse",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(res.data);
      return res.data; // return the response
    } catch (err) {
      setError(err as AxiosError);
      throw err; // re-throw the error to allow it to be caught in handleSubmit
    } finally {
      setLoading(false);
    }
  };

  return { loading, response, error, parsePdf };
};

export default usePdfParse;
