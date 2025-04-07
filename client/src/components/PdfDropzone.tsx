// components/PdfDropzone.tsx
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function PdfDropzone({
  onFileAccepted,
  onError,
}: {
  onFileAccepted: (f: File) => void;
  onError?: (e: string) => void;
}) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const droppedFile = acceptedFiles[0];

      const file = new File([droppedFile], droppedFile.name, {
        type: droppedFile.type,
        lastModified: droppedFile.lastModified,
      });

      onFileAccepted(file);
    },
    [onFileAccepted, onError]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "application/pdf": [] },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="border-2 border-dashed border-indigo-300 rounded-xl p-6 cursor-pointer text-center hover:bg-indigo-100 transition"
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">
        Drag and drop your PDF here or click to upload.
      </p>
    </div>
  );
}
