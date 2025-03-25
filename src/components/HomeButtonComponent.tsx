"use client";

import { ArrowLeft } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function HomeButtonComponent() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/") {
    return;
  }

  const handleClick = () => {
    router.push("/");
  };

  return (
    <div>
      <button
        className="bg-transparent border border-gray-500 px-2 py-1.5 rounded-full hover:scale-105"
        onClick={() => handleClick()}
      >
        <div className="flex gap-0.5">
          <div>
            <ArrowLeft size={20} />
          </div>
          <span>Go to Home</span>
        </div>
      </button>
    </div>
  );
}
