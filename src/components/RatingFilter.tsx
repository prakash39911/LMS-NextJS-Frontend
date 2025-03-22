import { ratings } from "@/lib/Values";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { ChangeEvent } from "react";
import { StarRating } from "./StarComponent";

type Props = {
  onChange: (ratings: string[]) => void;
  selectedRating: string[];
};

export default function RatingFilter({ onChange, selectedRating }: Props) {
  const handleRatingChange = (event: ChangeEvent<HTMLInputElement>) => {
    const clickedRating = event.target.value;

    const isChecked = event.target.checked;

    const newRatingsList = isChecked
      ? [...selectedRating, clickedRating]
      : selectedRating.filter((rating) => rating !== clickedRating);

    onChange(newRatingsList);
  };

  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-xl text-gray-100 flex items-center justify-center relative top-[-8px] font-semibold">
          Filter by Ratings
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {ratings.map((rating, index) => {
          const isSelected = selectedRating.includes(rating);
          return (
            <div className="flex" key={index}>
              <Input
                id={`rating_${rating}`}
                type="checkbox"
                className="hidden"
                value={rating}
                checked={isSelected}
                onChange={handleRatingChange}
              />
              <Label
                htmlFor={`rating_${rating}`}
                className={`flex flex-1 items-center text-gray-200 cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                  isSelected
                    ? "border border-blue-600  text-blue-600"
                    : "border border-slate-300"
                }`}
              >
                <div className="flex gap-1">
                  {rating} Star:
                  <StarRating rating={parseInt(rating)} />
                </div>
              </Label>
            </div>
          );
        })}
      </div>
    </>
  );
}
