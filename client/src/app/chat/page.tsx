"use client";
import { useEffect, useRef, useState } from "react";
import ChatMessage from "@/components/ChatMessage";
import { chatWithResume } from "@/lib/api";
import { motion } from "framer-motion";
import { Home } from "lucide-react";
import Link from "next/link";
type Message = {
  type: "user" | "ai" | "typing";
  text: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("Advice me on my resume!");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    handleSend();
  }, []);
  const handleSend = async () => {
    if (loading || !input.trim()) return;

    setLoading(true);
    const userMessage: Message = { type: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setMessages((prev) => [...prev, { type: "typing", text: "" }]);

    try {
      const reply = await chatWithResume(input);

      setMessages((prev) => prev.slice(0, -1));

      setMessages((prev) => [...prev, { type: "ai", text: reply }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prev) => prev.slice(0, -1));
      setMessages((prev) => [
        ...prev,
        { type: "ai", text: "Oops! Something went wrong." },
      ]);
    }

    setLoading(false);
  };

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  return (
    <div className="flex flex-col h-screen max-w-3xl mx-auto">
      <header className="border-b py-5 flex justify-between items-center">
        <Link href="/">
          <Home />
        </Link>
        <h1 className="text-xl">Resume Intercative</h1>
      </header>
      {/* Chat area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-white">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05 }}
          >
            <ChatMessage
              type={msg.type}
              text={msg.text}
            />
          </motion.div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:ring-2 disabled:ring-red-100"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask something about your resume..."
            disabled={loading}
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:bg-gray-500 disabled:text-white"
            onClick={handleSend}
            disabled={loading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
