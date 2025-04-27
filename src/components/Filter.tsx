"use client";

import { ChangeEvent, useEffect, useState } from "react";
import RatingFilter from "./RatingFilter";
import { useRouter } from "next/navigation";
import PriceFilter from "./PriceFilter";
import FilterPresetSelector from "./FilterPresetSelector";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useGetFilterPresetApi } from "@/hooks/useGetFilterPresetApi";
import { areObjectsEqual } from "@/lib/utilityFunctions";
import { SearchField } from "./SeachField";

export type FilterStateType = {
  selectedRating: string[];
  priceRange: number[];
};

const Filter = () => {
  const API_END_POINT = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [currentSelectedPresetId, setCurrentSelectedPresetId] = useState("");
  const [isPresetSaved, setIsPresetSaved] = useState(false);
  const [isDefaultFilter, setIsDefaultFilter] = useState(true);
  const [isPresetApplied, setIsPresetApplied] = useState(false);
  const [currentPresetName, setCurrentPresetName] = useState<string | null>(
    null
  );
  const [currentSelectedPreset, setCurrentSelectedPreset] =
    useState<FilterStateType>({ selectedRating: [], priceRange: [] });

  const [filterState, setFilterState] = useState<FilterStateType>({
    selectedRating: [],
    priceRange: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const [inputNameVisible, setInputNameVisible] = useState(false);

  const { getToken, isLoaded: isAuthLoaded } = useAuth();
  const router = useRouter();
  const { data, refetch } = useGetFilterPresetApi();

  const fetchedPresetData: getFilterPresetDataType = data || {
    SavedFilterData: [],
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    if (isAuthLoaded) {
      refetch();
    }
  }, [isAuthLoaded, refetch]);

  const setSelectedRating = (selectedRating: string[]) => {
    setFilterState((prevState) => ({
      ...prevState,
      selectedRating,
    }));
    setIsPresetSaved(false);
  };

  const setPriceFilter = (priceRange: number[]) => {
    setFilterState((prevState) => ({ ...prevState, priceRange }));
    setIsPresetSaved(false);
  };

  const handleSelectPreset = (id: string) => {
    setCurrentSelectedPresetId(id);
    fetchedPresetData.SavedFilterData.map((eachObj) => {
      if (eachObj.id === id) {
        setFilterState((prevState) => ({
          ...prevState,
          priceRange: eachObj.priceRange,
          selectedRating: eachObj.selectedRating,
        }));
        setCurrentSelectedPreset((prevState) => ({
          ...prevState,
          selectedRating: eachObj.selectedRating,
          priceRange: eachObj.priceRange,
        }));
        setCurrentPresetName(eachObj.name);
      }
    });

    setIsPresetApplied(true);
  };

  const handleCheckBoxChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) setInputNameVisible(true);
    if (!isChecked) setInputNameVisible(false);
  };

  const handlePresetSaveButton = async (event: any) => {
    event.preventDefault();
    const token = await getToken();
    const presetName = event.target.presetName.value;

    const result = await fetch(
      `${API_END_POINT}api/advancedFilter/createPreset`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ filterState, presetName, currentPresetName }),
      }
    );

    const finalResult = await result.json();

    if (finalResult.status) {
      setCurrentPresetName(finalResult?.data?.name);
      setCurrentSelectedPreset((prevState) => ({
        ...prevState,
        selectedRating: finalResult?.data?.selectedRating,
        priceRange: finalResult?.data?.priceRange,
      }));
      setIsPresetSaved(true);
      refetch();
      toast(`${finalResult.message}`);
    }
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

    if (debouncedQuery && debouncedQuery.trim().length > 0) {
      queryParams.set("search", debouncedQuery.trim());
    } else {
      queryParams.delete("search");
    }

    router.replace(`?${queryParams.toString()}`, { scroll: false });
  }, [
    filterState.selectedRating,
    router,
    filterState.priceRange,
    debouncedQuery,
  ]);

  useEffect(() => {
    const isDefault =
      filterState.selectedRating.length === 0 &&
      (filterState.priceRange.length === 0 ||
        (filterState.priceRange[0] === 0 &&
          filterState.priceRange[1] === 1000));

    if (isDefault) setIsDefaultFilter(true);
    if (!isDefault) setIsDefaultFilter(false);
  }, [
    filterState.priceRange.length,
    filterState.selectedRating.length,
    filterState.priceRange,
  ]);

  const handleResetButtonClick = () => {
    setFilterState({ selectedRating: [], priceRange: [] });
    setCurrentSelectedPreset({ selectedRating: [], priceRange: [] });
    setIsPresetApplied(false);
    setCurrentPresetName(null);
    setCurrentSelectedPresetId("");
    setSearchQuery("");
    setDebouncedQuery("");
  };

  return (
    <div className="flex flex-col items-center gap-2 overflow-y-auto">
      <div>
        <Button
          variant="ghost"
          className="h-8 bg-transparent border border-blue-500"
          onClick={() => handleResetButtonClick()}
        >
          Reset
        </Button>
      </div>
      <div>
        <SearchField
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
      <div className="flex flex-col gap-2 border border-gray-700 p-8">
        <span className="text-xl font-bold">Select Saved Filter</span>
        <FilterPresetSelector
          fetchedData={fetchedPresetData}
          onSelect={handleSelectPreset}
          value={currentSelectedPresetId}
        />
      </div>
      <div id="rating-list" className="border border-gray-700 p-8">
        <RatingFilter
          selectedRating={filterState.selectedRating}
          onChange={setSelectedRating}
        />
      </div>
      <div id="price-list" className="border border-gray-700 p-8">
        <PriceFilter
          onChange={setPriceFilter}
          selectedPrices={filterState.priceRange}
        />
      </div>
      {!isPresetSaved &&
        !isDefaultFilter &&
        (areObjectsEqual(currentSelectedPreset, filterState) ? (
          ""
        ) : (
          <div>
            <div
              id="save-button"
              className="flex flex-col gap-4 border border-gray-700 p-4 w-64"
            >
              <div className="flex gap-5 items-center">
                <input
                  type="checkbox"
                  className="w-5 h-5"
                  onChange={handleCheckBoxChange}
                />

                <div className="font-semibold">
                  {isPresetApplied ? "Update" : "Save"} This Preset
                </div>
              </div>

              {inputNameVisible && (
                <form
                  onSubmit={handlePresetSaveButton}
                  className="flex gap-4 items-center"
                >
                  {isPresetApplied && currentPresetName ? (
                    <div>
                      <Input
                        type="text"
                        defaultValue={currentPresetName}
                        name="presetName"
                        placeholder="Enter Preset name"
                        className="h-7 w-36 pl-1.5 text-black"
                      />
                    </div>
                  ) : (
                    <div>
                      <Input
                        type="text"
                        name="presetName"
                        placeholder="Enter Preset name"
                        className="h-7 w-36 pl-1.5 text-black"
                      />
                    </div>
                  )}

                  <div>
                    <Button
                      variant="outline"
                      type="submit"
                      className="bg-transparent h-7"
                    >
                      Save
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Filter;
