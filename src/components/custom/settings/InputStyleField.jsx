import React from "react";
import { Input } from "@/components/ui/input";

const InputStyleField = ({ onHandleStyleChange, value, label }) => {
  const formattedValue = (value_in_px) => {
    return typeof value_in_px === "string" && value_in_px.includes("px")
      ? Number(value_in_px.split("px")[0])
      : value_in_px;
  };
  return (
    <label className="flex flex-col gap-2">
      <span>{label} (in px)</span>
      <Input
        type="text"
        value={formattedValue(value) ? formattedValue(value) : " "}
        placeholder="Enter text..."
        onChange={(e) => onHandleStyleChange(e.target.value)}
      />
    </label>
  );
};

export default InputStyleField;
