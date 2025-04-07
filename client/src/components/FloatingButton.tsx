import { InfoIcon } from "lucide-react";
import React from "react";

export const FloatingButton = () => {
  return (
    <a
      href="https://github.com/Keshavs8055/resume-analyzer/tree/main"
      className="absolute w-10 h-10 bottom-3 right-3 rounded-4xl bg-indigo-800 flex justify-center items-center"
    >
      <InfoIcon className="text-white" />{" "}
    </a>
  );
};
