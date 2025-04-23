import React, { useState, KeyboardEvent } from "react";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput = ({ onSendMessage }: ChatInputProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center border-t border-gray-800 p-3 bg-gray-800"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        className="flex-grow px-4 py-2 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm placeholder-gray-400"
        aria-label="Type a message"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className={`ml-2 p-2 rounded-full ${
          message.trim()
            ? "bg-indigo-600 text-white hover:bg-indigo-700"
            : "bg-gray-700 text-gray-400"
        } focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200`}
        aria-label="Send message"
      >
        <Send size={18} />
      </button>
    </form>
  );
};

export default ChatInput;
