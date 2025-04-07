"use client";

import ReactMarkdown from "react-markdown";
import { Sparkles } from "lucide-react";

interface ResultDisplayProps {
  analysis: string;
  error?: string;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ analysis }) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-4">
        <Sparkles
          size={24}
          className="text-indigo-600"
        />
        <h2 className="text-2xl font-bold">Report</h2>
      </div>
      <span className="prose">
        <ReactMarkdown>{analysis}</ReactMarkdown>
      </span>
    </div>
  );
};
