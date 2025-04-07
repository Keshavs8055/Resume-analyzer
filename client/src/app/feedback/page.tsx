"use client";

import { useResume } from "@/context/ResumeContext";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ResultDisplay } from "@/components/ResultDisplay";
import FileDetails from "@/components/FileDetails";

export default function ResultsPage() {
  const { analysis } = useResume();
  const router = useRouter();

  return (
    <motion.main
      className="min-h-screen px-6 py-10 bg-white flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button
        onClick={() => router.push("/")}
        className="absolute top-6 left-6 text-indigo-600 flex items-center gap-2"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <h1 className="text-3xl font-bold text-indigo-800 mb-4">
        Resume Feedback
      </h1>

      <div className="bg-indigo-50 p-6 rounded-xl shadow-md max-w-3xl w-full whitespace-pre-wrap text-sm text-gray-800">
        <ResultDisplay analysis={analysis || "Not available"} />
      </div>
    </motion.main>
  );
}
