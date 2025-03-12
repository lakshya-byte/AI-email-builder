"use client";
import React from "react";
import { Layout } from "@/Data/Layout";
import ElementLayoutCard from "./ElementLayoutCard";
import ElementList from "@/Data/ElementList";
import { useDragDropElement } from "@/app/provider";

function ElementsSideBar() {
  const { setDragDropElement, dragDropElement } = useDragDropElement();

  const handleDragStart = (layout) => {
    console.log(layout);

    setDragDropElement({
      dragLayout: {
        ...layout,
        id: Date.now(),
      },
    });
    // console.log(dragDropElement);
  };

  const handleDragElementStart = (element) => {
    setDragDropElement({
      dragElement: {
        ...element,
        id: Date.now(),
      },
    });
  };

  return (
    <div className=" p-5 border-r border-gray-200 shadow-md">
      <h2 className="text-2xl font-bold my-4 text-gray-700 ">Layouts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3  ">
        {Layout.map((layout, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(layout)}
          >
            <ElementLayoutCard layout={layout} />
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold my-4 text-gray-700 ">Elements</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
        {ElementList.map((element, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragElementStart(element)}
          >
            <ElementLayoutCard layout={element} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ElementsSideBar;
