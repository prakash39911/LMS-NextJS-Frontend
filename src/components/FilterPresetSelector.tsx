import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FilterPresetSelector({
  fetchedData,
  value,
  onSelect,
}: {
  fetchedData: getFilterPresetDataType;
  value: string;
  onSelect: (id: string) => void;
}) {
  return (
    <Select value={value} onValueChange={(id) => onSelect(id)}>
      <SelectTrigger className="w-[200px] bg-gray-700 text-white border-gray-700">
        <SelectValue placeholder="Select Filter Preset" />
      </SelectTrigger>
      <SelectContent className="bg-gray-900 text-white border-gray-700">
        <SelectGroup>
          {fetchedData?.SavedFilterData.length > 0 &&
            fetchedData.SavedFilterData.map((eachObj) => (
              <SelectItem value={eachObj.id} key={eachObj.id}>
                {eachObj.name}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
