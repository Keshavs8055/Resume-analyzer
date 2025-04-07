"use client";

import { FileText, Trash2 } from "lucide-react";
import React from "react";

interface FileDetailsProps {
  file: File;
  onRemove?: () => void;
}

const FileDetails: React.FC<FileDetailsProps> = ({ file, onRemove }) => {
  const fileSize = (file.size / 1024).toFixed(2); // KB

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-5 w-full max-w-xl transition-all duration-300">
      <div className="flex items-center gap-4">
        <div className="bg-indigo-100 text-indigo-700 p-3 rounded-full">
          <FileText size={28} />
        </div>
        <div className="flex-1">
          <p className="text-lg font-semibold text-gray-800 truncate">
            {file.name}
          </p>
          <p className="text-sm text-gray-500">
            {file.type || "Unknown type"} &middot; {fileSize} KB
          </p>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-2 hover:bg-red-50 text-red-500 rounded-full transition"
            title="Remove file"
          >
            <Trash2 size={20} />
          </button>
        )}
      </div>
    </div>
  );
};

export default FileDetails;
