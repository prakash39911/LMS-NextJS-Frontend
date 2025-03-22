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
      {/* Fixed Button to toggle filter */}
      <button
        onClick={toggleFilter}
        hidden={!isButtonVisible}
        className="fixed right-4 top-20 bg-blue-700 text-white p-2 rounded-full shadow-lg z-50"
      >
        <div className="flex gap-0.5 p-0.5 text-gray-100 font-semibold">
          <span>
            <FilterIcon size={20} />
          </span>
          Filter
        </div>
      </button>

      {/* Filter Menu */}
      <div
        className={`fixed right-0 h-full top-14 w-72 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isFilterVisible ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <div className="text-white flex flex-col gap-5">
          <div
            className="flex justify-end mr-2 mt-2 cursor-pointer"
            onClick={() => {
              setIsFilterVisible(false);
              setIsButtonVisible(true);
            }}
          >
            <X size={35} />
          </div>
          <div>
            <Filter />
          </div>
        </div>
      </div>
    </div>
  );
}
