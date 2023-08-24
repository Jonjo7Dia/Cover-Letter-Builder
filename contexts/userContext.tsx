import React, { createContext, useContext, ReactNode, useState } from "react";

type Job = {
  companyName: string;
  dateApplied: Date;
  replied: string;
  interview: string;
  offer: string;
  position: string;
  jobAd: string;
};

type ApiResponse = any;

type UserState = {
  parsedPdfText: any;
  jobApplicationText: string;
  companyValues: string[];
  companyMissionStatement: string;
  onboardingStep: 1 | 2 | 3;
  apiResponse: ApiResponse | null;
  isFetching: boolean;
  userPdf: {
    uploaded: boolean;
    name: string;
    text: string;
  };
  jobs: Job[];
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
  setJobs: (jobs: Job[] | ((prevJobs: Job[]) => Job[])) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

type UserProviderProps = {
  children: ReactNode;
};

export function UserProvider({ children }: UserProviderProps) {
  const [parsedPdfText, setParsedPdfText] = useState<any>("");
  const [jobApplicationText, setJobApplicationText] = useState<string>("");
  const [companyValues, setCompanyValues] = useState<string[]>([]);
  const [companyMissionStatement, setCompanyMissionStatement] =
    useState<string>("");
  const [onboardingStep, setOnboardingStep] = useState<1 | 2 | 3>(1);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [userPdfState, setUserPdfState] = useState({
    uploaded: false,
    name: "",
    text: "",
  });
  const [jobs, setJobs] = useState<Job[]>([]);

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
        apiResponse,
        isFetching,
        userPdf: userPdfState,
        jobs,
        setParsedPdfText,
        setJobApplicationText,
        setCompanyValues,
        setCompanyMissionStatement,
        setOnboardingStep,
        setApiResponse,
        setIsFetching,
        setUserPdf,
        setJobs,
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
