import { useState } from "react";
import axios from "axios";
import { useUser } from "contexts/userContext";
import { coverLetterPrompt } from "utils/promptCreator";

export const useOpenAI = () => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const { setApiResponse, setIsFetching } = useUser();

  const generateCoverLetter = async (
    parsedPdfText: string,
    jobApplicationText: string,
    companyValues: string[],
    companyMission: string
  ) => {
    try {
      const prompt = coverLetterPrompt(
        parsedPdfText,
        jobApplicationText,
        companyValues,
        companyMission
      );
      const testResponse = await fetch("/api/gptApi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt }),
      });
      if (!testResponse.ok) throw new Error(testResponse.statusText);
      const data = testResponse.body;
      if (!data) return;

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let answer = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);
        answer += chunkValue;
      }
      setData(answer);
      setApiResponse(answer);
      setIsFetching(false);
    } catch (err: any) {
      const errorMessage = err.message;
      setError(errorMessage);
      setApiResponse({ error: errorMessage }); // set error message in apiResponse
      setIsFetching(false);
    }
  };

  const generateRejectionResponseLetter = async () => {};

  const generateRejectionLetter = async () => {};

  const generateFollowUpLetter = async () => {};

  const generateThankyouLetter = async () => {};
  return { data, error, generateCoverLetter };
};
