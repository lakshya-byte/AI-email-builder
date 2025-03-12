import { Slider } from "@/components/ui/slider";
import React from "react";
import { cn } from "@/lib/utils";

const SliderField = ({ label, value, onHandleStyleChange }) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}({value})</label>
      <Slider
        // value={[value]}
        className={cn("w-[60%]")}
        onValueChange={(value) => onHandleStyleChange(value[0])}
        max={100}
        min={0}
        step={1}
        defaultValue={[33]}
      />
    </div>
  );
};

export default SliderField;
