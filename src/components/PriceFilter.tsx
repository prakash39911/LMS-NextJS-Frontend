import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type Props = {
  onChange: (priceRange: number[]) => void;
};

export default function PriceFilter({ onChange }: Props) {
  const [value, setValue] = React.useState<number[]>([0, 1000]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(newValue as number[]);
  };

  return (
    <div>
      <div className="text-xl text-gray-200 font-bold flex justify-center">
        Filter by Prices
      </div>
      <Box sx={{ width: 200 }}>
        <Slider
          getAriaLabel={() => "Temperature range"}
          value={value}
          onChange={handleChange}
          min={0}
          max={1000}
          aria-label="Always visible"
          valueLabelDisplay="auto"
        />
      </Box>
      <div className="flex justify-between text-gray-200">
        <div>Min: {value[0]}</div>
        <div>Max: {value[1]}</div>
      </div>
    </div>
  );
}
