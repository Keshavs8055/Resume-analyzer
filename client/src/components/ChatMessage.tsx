import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

export default function ChatMessage({
  type,
  text,
}: {
  type: "user" | "ai" | "typing";
  text: string;
}) {
  const isUser = type === "user";
  const isTyping = type === "typing";
  return (
    <motion.div
      initial={{ opacity: 0, x: isUser ? 50 : -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      {isTyping ? (
        <div className="flex space-x-1">
          <motion.span
            className="dot"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1 }}
          >
            ●
          </motion.span>
          <motion.span
            className="dot"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
          >
            ●
          </motion.span>
          <motion.span
            className="dot"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
          >
            ●
          </motion.span>
        </div>
      ) : (
        <div
          className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm whitespace-pre-wrap shadow-md ${
            isUser
              ? "bg-indigo-600 text-white rounded-br-none"
              : "bg-gray-100 text-gray-900 rounded-bl-none"
          }`}
        >
          {isUser ? text : <ReactMarkdown>{text}</ReactMarkdown>}
        </div>
      )}
    </motion.div>
  );
}
