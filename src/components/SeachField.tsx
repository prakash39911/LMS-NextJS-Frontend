"use client";

import React from "react";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";

type Props = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
};

export const SearchField = ({ searchQuery, setSearchQuery }: Props) => {
  const currentPath = usePathname();

  if (currentPath !== "/all-courses") {
    return;
  }

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 transition-colors duration-200" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleOnChange(e)}
          placeholder="Search..."
          className="w-full pl-12 pr-4 py-3 bg-gray-900/50 backdrop-blur-xl text-white placeholder-gray-400 
                   rounded-2xl border border-gray-700/50 focus:border-indigo-500 focus:ring-2 
                   focus:ring-indigo-500/20 outline-none transition-all duration-200
                   hover:border-gray-600/50 hover:bg-gray-900/60"
        />
      </div>
    </div>
  );
};
