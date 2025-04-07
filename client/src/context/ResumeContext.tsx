"use client";

import { createContext, useContext, useState } from "react";

interface ResumeContextType {
  analysis: string | null;
  setAnalysis: (value: string) => void;
  resumeText: string | null;
  setResumeText: (text: string) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: React.ReactNode }) => {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [resumeText, setResumeText] = useState<string | null>(null);

  return (
    <ResumeContext.Provider
      value={{ analysis, setAnalysis, resumeText, setResumeText }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error("useResume must be used within ResumeProvider");
  }
  return context;
};
