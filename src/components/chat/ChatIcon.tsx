import React from "react";
import { MessageCircle } from "lucide-react";

interface ChatIconProps {
  onClick: () => void;
}

const ChatIcon = ({ onClick }: ChatIconProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full w-[70px] h-[70px] flex items-center justify-center shadow-lg transform transition-all duration-300 hover:scale-110 relative"
      aria-label="Open chat"
    >
      <MessageCircle size={28} />
      <span className="absolute w-full h-full rounded-full bg-blue-500 animate-custom-pulse"></span>
    </button>
  );
};

export default ChatIcon;
