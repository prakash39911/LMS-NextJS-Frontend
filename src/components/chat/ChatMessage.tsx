import React from "react";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "model";
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isLoading: boolean;
}

const ChatMessage = ({ message, isLoading }: ChatMessageProps) => {
  const isUser = message.sender === "user";
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    timeZone: "Asia/Kolkata", // Convert to IST
  }).format(new Date(message.timestamp));

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
      <div
        className={`max-w-[80%] px-4 py-2 rounded-lg ${
          isUser
            ? "bg-indigo-600 text-white rounded-br-none"
            : "bg-gray-800 text-gray-100 rounded-bl-none"
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className={`text-xs mt-1 ${
            isUser ? "text-indigo-200" : "text-gray-400"
          }`}
        >
          {formattedTime}
        </p>
      </div>
    </div>
  );
};

export default ChatMessage;
