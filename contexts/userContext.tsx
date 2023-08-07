import React, { createContext, useContext, ReactNode, useState } from "react";

type ApiResponse = any;

type UserState = {
  parsedPdfText: any;
  jobApplicationText: string;
  companyValues: string[];
  companyMissionStatement: string;
  onboardingStep: 1 | 2 | 3;
  apiResponse: ApiResponse | null; // State for API response
  isFetching: boolean; // State for fetch status
  userPdf: {
    uploaded: boolean;
    name: string;
    text: string;
  };
};

type UserContextType = UserState & {
  setParsedPdfText: (text: any) => void;
  setJobApplicationText: (text: string) => void;
  setCompanyValues: (values: string[]) => void;
  setCompanyMissionStatement: (text: string) => void;
  setOnboardingStep: (step: 1 | 2 | 3) => void;
  setApiResponse: (response: ApiResponse | null) => void;
  setIsFetching: (fetching: boolean) => void;
  setUserPdf: (uploaded: boolean, name: string, text: string) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [parsedPdfText, setParsedPdfText] = useState("");
  const [jobApplicationText, setJobApplicationText] = useState("");
  const [companyValues, setCompanyValues] = useState<string[]>([]);
  const [companyMissionStatement, setCompanyMissionStatement] = useState("");
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3>(1);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null); // Initialize state for API response
  const [isFetching, setIsFetching] = useState(false); // Initialize state for fetch status
  const [userPdfState, setUserPdfState] = useState({
    uploaded: false,
    name: "",
    text: "",
  });

  const setUserPdf = (uploaded: boolean, name: string, text: string) => {
    setUserPdfState({ uploaded, name, text });
  };

  return (
    <UserContext.Provider
      value={{
        parsedPdfText,
        jobApplicationText,
        companyValues,
        companyMissionStatement,
        onboardingStep,
        apiResponse, // Provide API response state
        isFetching, // Provide fetch status state
        userPdf: userPdfState,
        setParsedPdfText,
        setJobApplicationText,
        setCompanyValues,
        setCompanyMissionStatement,
        setOnboardingStep,
        setApiResponse, // Provide setter for API response
        setIsFetching, // Provide setter for fetch status
        setUserPdf, // Adjusted setter for userPdf
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}

export default UserContext;
