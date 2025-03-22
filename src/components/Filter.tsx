"use client";

import { useEffect, useState } from "react";
import RatingFilter from "./RatingFilter";
import { useRouter } from "next/navigation";
import PriceFilter from "./PriceFilter";

export type FilterStateType = {
  selectedRating: string[];
  priceRange: number[];
};

const Filter = () => {
  const router = useRouter();
  const [filterState, setFilterState] = useState<FilterStateType>({
    selectedRating: [],
    priceRange: [],
  });

  const setSelectedCuisines = (selectedRating: string[]) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedRating,
    }));
  };

  const setPriceFilter = (priceRange: number[]) => {
    setFilterState((prevState) => ({ ...prevState, priceRange }));
  };

  useEffect(() => {
    const queryParams = new URLSearchParams();

    if (filterState.selectedRating.length > 0) {
      queryParams.set("ratings", filterState.selectedRating.join(","));
    } else {
      queryParams.delete("ratings");
    }

    if (filterState.priceRange.length > 0) {
      queryParams.set("priceRange", filterState.priceRange.join(","));
    } else {
      queryParams.delete("priceRange");
    }

    router.replace(`?${queryParams.toString()}`, { scroll: false });
  }, [filterState.selectedRating, router, filterState.priceRange]);

  return (
    <div className="flex flex-col items-center gap-10">
      <div id="rating-list">
        <RatingFilter
          selectedRating={filterState.selectedRating}
          onChange={setSelectedCuisines}
        />
      </div>
      <div id="price-list">
        <PriceFilter onChange={setPriceFilter} />
      </div>
    </div>
  );
};

export default Filter;
