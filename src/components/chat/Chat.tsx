"use client";

import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatIcon from "./ChatIcon";
import ChatWindow from "./ChatWindow";
import { Message } from "./ChatMessage";
import { v4 as uuidv4 } from "uuid";

interface ChatProps {
  initialMessages?: Message[];
}

const Chat = ({ initialMessages = [] }: ChatProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const handleSendMessage = async (text: string) => {
    const newMessage: Message = {
      id: uuidv4(),
      text,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages([...messages, newMessage]);

    const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

    try {
      setIsLoading(true);

      const response = await fetch(`${API_END_POINT}api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: text }),
      });

      const finalData = await response.json();

      const systemResponse: Message = {
        id: uuidv4(),
        text: finalData?.data,
        sender: "system",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, systemResponse]);
    } catch (error) {
      console.error("Error while generating response", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-12 right-12 z-50">
      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            className="mb-4"
          >
            <ChatWindow
              messages={messages}
              onSendMessage={handleSendMessage}
              onClose={closeChat}
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="chat-icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <ChatIcon onClick={toggleChat} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chat;
