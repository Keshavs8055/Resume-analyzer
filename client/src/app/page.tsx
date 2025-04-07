"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PdfDropzone from "@/components/PdfDropzone";
import AnalyzeButton from "@/components/AnalyzeButton";
import { useResume } from "@/context/ResumeContext";
import ErrorBanner from "@/components/ErrorBanner";
import FileDetails from "@/components/FileDetails";
import FeedbackButton from "@/components/FeedbackButton";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const router = useRouter();
  const { setAnalysis } = useResume();

  return (
    <main className="py-10 bg-gradient-to-b from-indigo-50 to-white flex flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-indigo-800 mb-2">
        AI Resume Analyzer
      </h1>
      <p className="text-gray-600 mb-6 text-center max-w-lg">
        Upload your resume and get instant AI-powered insights.
      </p>

      <div className="w-full max-w-xl space-y-4">
        {error && <ErrorBanner message={error} />}

        {file ? (
          <FileDetails file={file} />
        ) : (
          <PdfDropzone
            onFileAccepted={(f) => {
              setFile(f);
              setError("");
            }}
            onError={setError}
          />
        )}
        <div className="flex gap-6 items-center justify-between">
          <AnalyzeButton
            file={file}
            onAnalysisComplete={(text) => {
              setAnalysis(text);
              router.push("/chat");
            }}
            onError={(err) =>
              setError(
                typeof err === "string"
                  ? err
                  : err.message || "Something went wrong."
              )
            }
          />
          <FeedbackButton
            file={file}
            onAnalysisComplete={(text) => {
              setAnalysis(text);
              router.push("/feedback");
            }}
            onError={(err) =>
              setError(
                typeof err === "string"
                  ? err
                  : err.message || "Something went wrong."
              )
            }
          />
        </div>
      </div>
    </main>
  );
}
