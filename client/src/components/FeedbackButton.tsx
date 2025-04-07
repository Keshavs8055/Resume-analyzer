import { useState } from "react";
import { FileText, Loader2 } from "lucide-react";
import { FeedbackResume } from "@/lib/api";

export default function FeedbackButton({
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
    const { analysis, error } = await FeedbackResume(file);
    setLoading(false);

    if (error) {
      onError(error);
    } else if (analysis) {
      onAnalysisComplete(analysis);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={!file || loading}
      className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-white font-semibold transition duration-300 ${
        file
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
      {loading ? "Analyzing..." : "Give Me Feedback"}
    </button>
  );
}
