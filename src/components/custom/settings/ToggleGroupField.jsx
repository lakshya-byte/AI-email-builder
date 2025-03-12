import React from "react";
import { Bold, Italic, Underline } from "lucide-react";

import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const ToggleGroupField = ({ label, value, onHandleStyleChange, options }) => {
    
  return (
    <div>
      <label>{label}</label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={onHandleStyleChange}
        className="flex gap-2 cursor-pointer"
      >
        {options.map((option, index) => (
          <ToggleGroupItem
            key={index}
            value={option?.value ?? " "}
            variant="outline"
          >
            <option.icon className="h-4 w-4" />
            {option?.label ?? " "}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};

export default ToggleGroupField;
