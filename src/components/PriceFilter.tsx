import * as React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

type Props = {
  selectedPrices: number[];
  onChange: (priceRange: number[]) => void;
};

export default function PriceFilter({ onChange, selectedPrices }: Props) {
  const [value, setValue] = React.useState<number[]>(
    selectedPrices?.length > 0 ? selectedPrices : [0, 1000]
  );

  // Separate the local state update from the parent notification
  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
  };

  // Only notify parent component when slider interaction ends
  const handleChangeCommitted = (
    event: Event | React.SyntheticEvent,
    newValue: number | number[]
  ) => {
    onChange(newValue as number[]);
  };

  React.useEffect(() => {
    setValue(selectedPrices?.length ? selectedPrices : [0, 1000]);
  }, [selectedPrices]);

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
          onChangeCommitted={handleChangeCommitted}
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
