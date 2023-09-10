// utils/useOpenAI.tsx
import { useState } from "react";
import axios from "axios";
import { useUser } from "contexts/userContext";

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
      const response = await axios.post("/api/gptApi", {
        parsedPdfText,
        jobApplicationText,
        companyValues,
        companyMission,
        temperature: 0.0,
      });
      setData(parseCompletedData(response.data));
      setApiResponse(parseCompletedData(response.data));
      setIsFetching(false);
    } catch (err: any) {
      const errorMessage = err.message;
      setError(errorMessage);
      setApiResponse({ error: errorMessage }); // set error message in apiResponse
      setIsFetching(false);
    }
  };
  const parseCompletedData = (rawData: string) => {
    // Split rawData by '\n\n' to get individual messages
    const messages = rawData
      .split("\n\n")
      .map((msg) => {
        const dataPart = msg.replace("data: ", "");
        try {
          return JSON.parse(dataPart);
        } catch (err) {
          return null;
        }
      })
      .filter(Boolean); // filter out null values

    // Find the message with "completed" status
    const completedMessage = messages.find((msg) => msg.status === "completed");

    // If there's a completed message, parse and return its data content
    if (completedMessage && completedMessage.data) {
      try {
        return JSON.parse(completedMessage.data);
      } catch (err) {
        return null;
      }
    }

    return null;
  };

  const generateRejectionResponseLetter = async () => {};

  const generateRejectionLetter = async () => {};

  const generateFollowUpLetter = async () => {};

  const generateThankyouLetter = async () => {};
  return { data, error, generateCoverLetter };
};
