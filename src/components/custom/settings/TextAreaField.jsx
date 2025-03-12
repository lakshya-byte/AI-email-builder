import React from 'react'
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const TextAreaField = ({label, value, onHandleInputChange}) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{label}</label>
      <Textarea
        value={value ?? " "}
        onChange={(e) => onHandleInputChange(e.target.value)}
      />
    </div>
  );
};

export default TextAreaField
