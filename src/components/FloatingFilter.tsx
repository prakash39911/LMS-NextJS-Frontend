"use client";

import React, { useState } from "react";
import Filter from "./Filter";
import { FilterIcon, X } from "lucide-react";

export default function FloatingFilter() {
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const toggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
    setIsButtonVisible(!isButtonVisible);
  };

  return (
    <div>
      <button
        onClick={toggleFilter}
        hidden={!isButtonVisible}
        className="fixed right-4 top-20 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white px-4 py-2.5 rounded-full shadow-md shadow-indigo-500 z-50 transition-all duration-300 ease-in-out transform hover:scale-125 hover:shadow-xl group"
      >
        <div className="flex items-center gap-2">
          <FilterIcon
            size={20}
            className="group-hover:rotate-180 transition-transform duration-300"
          />
          <span className="font-medium text-sm tracking-wide hidden md:block">
            Filter
          </span>
        </div>
      </button>

      {/* Filter Menu */}
      <div
        className={`fixed right-0 h-full top-16 w-80 bg-transparent/10 backdrop-blur-md shadow-lg transform transition-transform duration-300 ease-in-out ${
          isFilterVisible ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <div className="text-white flex flex-col gap-5">
          <span
            className="cursor-pointer w-8 fixed right-2 top-2"
            onClick={() => {
              setIsFilterVisible(false);
              setIsButtonVisible(true);
            }}
          >
            <X size={35} />
          </span>
          <div className="relative top-14 overflow-filter-height overflow-y-auto">
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
}
