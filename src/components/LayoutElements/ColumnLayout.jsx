"use client";

import React, { useState } from "react";
import {
  useEmailTemplate,
  useDragDropElement,
  useSelectedElement,
} from "@/app/provider";
import ButtonComponent from "../custom/Element/ButtonComponent";
import TextComponent from "../custom/Element/TextComponent";
import ImageComponent from "../custom/Element/ImageComponent";
import LogoComponent from "../custom/Element/LogoComponent";
import DividerComponent from "../custom/Element/DividerComponent";
import SocialIconComponent from "../custom/Element/SocialIconComponent";
import { ArrowDown, ArrowUp, Trash2Icon, TrashIcon } from "lucide-react";

const ColumnLayout = ({ layout }) => {
  const [dragOver, setDragOver] = useState(null);
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const { dragDropElement, setDragDropElement } = useDragDropElement();
  const { selectedElement, setSelectedElement } = useSelectedElement();

  const onDragOverHandle = (event, index) => {
    event.preventDefault();
    setDragOver({
      index: index,
      columnId: layout?.id,
    });
  };

  const onDragLeaveHandle = () => {
    setDragOver(null);
  };

  const onDropHandle = () => {
    const index = dragOver.index;
    setEmailTemplate((prevItem) =>
      prevItem?.map((col) =>
        col.id === layout?.id
          ? { ...col, [index]: dragDropElement?.dragElement }
          : col
      )
    );
    // console.log(emailTemplate);
    setDragOver(null);
  };

  const deleteLayout = (layourId) => {
    setEmailTemplate((prevItem) =>
      prevItem?.filter((col) => col.id !== layourId)
    );
    setSelectedElement(null);
  };

  const moveLayoutUp = (layourId) => {
    const index = emailTemplate?.findIndex((col) => col.id === layourId);
    if (index > 0) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems];
        const temp = updatedItems[index - 1];
        updatedItems[index - 1] = updatedItems[index];
        updatedItems[index] = temp;
        return updatedItems;
      });
    }
  };
  const moveLayoutDown = (layourId) => {
    const index = emailTemplate?.findIndex((col) => col.id === layourId);
    if (index < emailTemplate?.length - 1) {
      setEmailTemplate((prevItems) => {
        const updatedItems = [...prevItems];
        const temp = updatedItems[index + 1];
        updatedItems[index + 1] = updatedItems[index];
        updatedItems[index] = temp;
        return updatedItems;
      });
    }
  };

  const getElementComponent = (element) => {
    console.log(element);
    switch (element?.type) {
      case "Button":
        return <ButtonComponent {...element} />;
      case "Text":
        return <TextComponent {...element} />;
      case "Image":
        return <ImageComponent {...element} />;
      case "Logo":
        return <LogoComponent {...element} />;
      case "Divider":
        return <DividerComponent {...element} />;
      case "SocialIcons":
        return <SocialIconComponent {...element} />;
      default:
        return "drag element here";
    }
  };

  return (
    <div className="relative">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${layout?.numOfCol}, 1fr)`,
          gap: "10px",
        }}
        className={`${selectedElement?.layout?.id === layout?.id && "border-1 border-blue-500 border-dashed"}`}
      >
        {Array.from({ length: layout?.numOfCol }).map((_, index) => (
          <div
            className={`flex justify-center items-center p-2 m-0.5 transition-all duration-200 cursor-grabbing
                ${!layout?.[index]?.type ? "border-2 border-dotted border-gray-500 bg-gray-200 hover:bg-gray-300" : ""}

                ${index === dragOver?.index && dragOver?.columnId === layout?.id ? "bg-amber-100" : ""}

                ${selectedElement?.layout?.id === layout?.id && selectedElement?.index === index ? "border-blue-500 border-2 " : ""}
            `}
            key={index}
            onDragOver={(event) => onDragOverHandle(event, index)}
            onDragLeave={onDragLeaveHandle}
            onDrop={() => onDropHandle()}
            onClick={() =>
              setSelectedElement({
                layout: layout,
                index: index,
              })
            }
          >
            {getElementComponent(layout?.[index])}
          </div>
        ))}
        {selectedElement?.layout?.id === layout?.id && (
          <div className="flex flex-col gap-4">
            <div
              className="absolute -right-12 top-0   p-2 bg-gray-200 shadow-lg rounded-full cursor-pointer"
              onClick={() => {
                deleteLayout(layout?.id);
              }}
            >
              <Trash2Icon className="w-4 h-4 cursor-pointer text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 " />
            </div>
            <div
              className="absolute -right-12 top-10  p-2 bg-gray-200 shadow-lg rounded-full cursor-pointer"
              onClick={() => {
                moveLayoutUp(layout?.id);
              }}
            >
              <ArrowUp className="w-4 h-4 cursor-pointer text-gray-500 hover:bg-gray-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 " />
            </div>
            <div
              className="absolute -right-12 top-20 p-2 bg-gray-200 shadow-lg rounded-full cursor-pointer"
              onClick={() => {
                moveLayoutDown(layout?.id);
              }}
            >
              <ArrowDown className="w-4 h-4 cursor-pointer text-gray-500 hover:bg-gray-500 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-110 " />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ColumnLayout;
