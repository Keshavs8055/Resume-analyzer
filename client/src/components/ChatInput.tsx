"use client";

import { useState } from "react";

export default function ChatInput({
  onSend,
}: {
  onSend: (msg: string) => void;
}) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  return (
    <div className="flex gap-2 p-4 border-t bg-white">
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Ask about your resume..."
        className="flex-1 px-4 py-2 border rounded-lg"
      />
      <button
        onClick={handleSend}
        className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}
