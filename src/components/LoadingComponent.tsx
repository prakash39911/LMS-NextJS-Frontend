import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingProps {
  className?: string;
}

export default function LoadingComponent({ className = "" }: LoadingProps) {
  return (
    <div className="relative">
      <div
        className={`
          animate-spin 
          ${className}
          text-cyan-500
          z-50
        `}
        style={{
          animationDuration: "1.5s",
          animationTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <Loader2
          className="
            w-full 
            h-full 
            stroke-[2.5]
          "
        />
      </div>
    </div>
  );
}
