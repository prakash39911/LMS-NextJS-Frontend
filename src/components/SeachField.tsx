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
    <div className="relative w-full mx-auto">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          className={`
            w-full
            py-2
            pl-11
            pr-4
            bg-gray-900
            border
            border-gray-700
            rounded-lg
            text-gray-100
            placeholder-gray-400
            outline-none
            focus:border-blue-500
          `}
          onChange={(e) => handleOnChange(e)}
        />
      </div>
    </div>
  );
};
