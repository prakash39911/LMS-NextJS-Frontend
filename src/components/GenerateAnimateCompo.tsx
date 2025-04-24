import React, { useEffect, useState } from "react";
import LoadingComponent from "./LoadingComponent";

function GenerateAnimateCompo() {
  const text = "Generating Response";
  const [maskPosition, setMaskPosition] = useState<number>(0);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setMaskPosition((prevPosition) =>
        prevPosition >= 100 ? -20 : prevPosition + 0.8
      );
    }, 16);

    return () => clearInterval(animationInterval);
  }, []);

  return (
    <div className="flex gap-2 items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="relative overflow-hidden rounded-lg bg-gray-900 p-2 shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold tracking-wide text-gray-600 flex">
            {text.split("").map((char, index) => (
              <span
                key={index}
                className="relative"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                {char === " " ? "\u00A0" : char}
                <span
                  className="absolute inset-0 text-white overflow-hidden"
                  style={{
                    clipPath: `inset(0 ${Math.max(
                      0,
                      Math.min(100, 120 - maskPosition * 3 + index * 15)
                    )}% 0 0)`,
                    transition: "clip-path 0.05s ease-out",
                  }}
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              </span>
            ))}
          </h2>
        </div>
      </div>
      <div>
        <LoadingComponent className="w-8 h-8 text-gray-300" />
      </div>
    </div>
  );
}

export default GenerateAnimateCompo;
