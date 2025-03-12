import React from "react";
// import { Layout } from "@/Data/Layout";

const ElementLayoutCard = ({ layout }) => {
  return (
    <div
    //   key={index}
      className="flex flex-col items-center gap-2 justify-center border border-dashed border-gray-300 rounded-md p-2 cursor-pointer hover:bg-gray-50 transition-all duration-300 hover:border-gray-400 hover:shadow-md hover:shadow-gray-200 hover:scale-105 "
    >
      <layout.icon />
      <span>{layout.label}</span>
    </div>
  );
};

export default ElementLayoutCard;
