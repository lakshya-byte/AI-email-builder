import { Input } from "@/components/ui/input";
import React from "react";

const InputField = ({ label,  onHandleInputChange}) => {
  return (
    <div>
      <label className="text-sm font-medium p-1" htmlFor="input-field">{label}</label>
      <Input
        className="w-full"
        placeholder="Enter your text"
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
};

export default InputField;
