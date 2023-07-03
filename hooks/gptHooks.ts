// utils/useOpenAI.tsx
import { useState } from "react";
import axios from "axios";

export const useOpenAI = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);

  const generateCoverLetter = async (
    parsedPdfText: string,
    jobApplicationText: string,
    companyValues: string[],
    companyMission: string
  ) => {
    try {
      const response = await axios.post("/api/gptApi", {
        parsedPdfText,
        jobApplicationText,
        companyValues,
        companyMission,
      });

      setData(response.data.data);
      console.log(data);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return { data, error, generateCoverLetter };
};
