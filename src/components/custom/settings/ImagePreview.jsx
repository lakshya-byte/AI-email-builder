import React from "react";
import { Input } from "@/components/ui/input";

const ImagePreview = ({ label, value, onHandleInputChange }) => {
  return (
    <div>
      <label>{label}</label>
      <img
        src={value}
        alt="Preview"
        className="w-full h-[150px] object-contain rounded-2xl mt-2"
      />
      <Input
        type="text"
        name="imageUrl"
        id="imageUrl"
        value={value}
        onChange={(e) => onHandleInputChange(e.target.value)}
        className="w-full mt-2"
      />

    </div>
  );
};

export default ImagePreview;
