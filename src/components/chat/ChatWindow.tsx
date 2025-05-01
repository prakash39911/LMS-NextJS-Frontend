import React, { useEffect, useRef } from "react";
import { X } from "lucide-react";
import ChatMessage, { Message } from "./ChatMessage";
import ChatInput from "./ChatInput";
import LoadingComponent from "../LoadingComponent";

interface ChatWindowProps {
  messages: Message[];
  onSendMessage: (text: string) => void;
  onClose: () => void;
  isLoading: boolean;
}

const ChatWindow = ({
  messages,
  onSendMessage,
  onClose,
  isLoading,
}: ChatWindowProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay ensures DOM is updated

    return () => clearTimeout(timeout);
  }, [messages]);

  return (
    <div className="flex flex-col w-[381px] h-[550px] md:w-[400px] md:h-[500px] bg-gray-900 rounded-lg shadow-xl overflow-hidden border border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <h3 className="font-bold bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text text-xl">
          AI ChatBot
        </h3>
        <div className="flex space-x-2">
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white focus:outline-none transition-colors duration-200"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow p-4 overflow-y-auto bg-gray-900 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isLoading={isLoading}
            />
          ))
        )}
        <div ref={messagesEndRef}>
          {isLoading ? <LoadingComponent className="w-8 h-8" /> : ""}
        </div>
      </div>

      {/* Input */}
      <ChatInput onSendMessage={onSendMessage} />
    </div>
  );
};

export default ChatWindow;
