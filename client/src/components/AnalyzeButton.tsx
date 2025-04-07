"use client";

import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { analyzeResume } from "@/lib/api";

export default function AnalyzeButton({
  file,
  onAnalysisComplete,
  onError,
}: {
  file: File | null;
  onAnalysisComplete: (text: string) => void;
  onError: (err: Error | string) => void;
}) {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (!file) return;
    setLoading(true);

    const toastId = toast.loading("Analyzing resume...");

    try {
      const { analysis, error } = await analyzeResume(file);
      toast.dismiss(toastId);
      setLoading(false);

      if (error) {
        toast.error("Failed to analyze resume.");
        onError(error);
      } else if (analysis) {
        toast.success("Analysis complete!");
        onAnalysisComplete(analysis);
      }
    } catch (err: any) {
      toast.dismiss(toastId);
      toast.error("Unexpected error occurred.");
      setLoading(false);
      onError(err instanceof Error ? err : String(err));
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      disabled={!file || loading}
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: file && !loading ? 1.02 : 1 }}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ${
        file && !loading
          ? "bg-indigo-600 hover:bg-indigo-700"
          : "bg-gray-300 cursor-not-allowed"
      }`}
    >
      {loading ? (
        <Loader2
          className="animate-spin"
          size={20}
        />
      ) : (
        <FileText size={20} />
      )}
      {loading ? "Analyzing..." : "Analyze Resume"}
    </motion.button>
  );
}
