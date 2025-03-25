import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
}

export function StarRating({ rating, maxStars = 5 }: StarRatingProps) {
  return (
    <div className="flex gap-1 items-center">
      {[...Array(maxStars)].map((_, index) => (
        <Star
          key={index}
          size={16}
          className={`w-5 h-5 ${
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-transparent text-gray-300"
          }`}
        />
      ))}
    </div>
  );
}
