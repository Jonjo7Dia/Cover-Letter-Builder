import React, { createContext, useContext, ReactNode, useState } from "react";

type UserState = {
  parsedPdfText: string;
  jobApplicationText: string;
  companyValues: string[];
  companyMissionStatement: string;
  onboardingStep: 1 | 2 | 3;
};

type UserContextType = UserState & {
  setParsedPdfText: (text: string) => void;
  setJobApplicationText: (text: string) => void;
  setCompanyValues: (values: string[]) => void;
  setCompanyMissionStatement: (text: string) => void;
  setOnboardingStep: (step: 1 | 2 | 3) => void;
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

  return (
    <UserContext.Provider
      value={{
        parsedPdfText,
        jobApplicationText,
        companyValues,
        companyMissionStatement,
        onboardingStep,
        setParsedPdfText,
        setJobApplicationText,
        setCompanyValues,
        setCompanyMissionStatement,
        setOnboardingStep,
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
