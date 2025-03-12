"use client";

import React, { useEffect, useState } from "react";
import InputField from "./settings/InputField";
import { useSelectedElement } from "@/app/provider";
import ColorPickerField from "./settings/ColorPickerField";
import InputStyleField from "./settings/InputStyleField";
import SliderField from "./settings/SliderField";
import TextAreaField from "./settings/TextAreaField";
import ToggleGroupField from "./settings/ToggleGroupField";
import {
  AlignLeftIcon,
  AlignCenterIcon,
  AlignRightIcon,
  CaseUpperIcon,
  CaseLowerIcon,
  CaseSensitiveIcon,
  // CaseLowerIcon,
  // CaseCapitalizeIcon,
} from "lucide-react";
import ImagePreview from "./settings/ImagePreview";
import SocialIconField from "./settings/SocialIconField";

const textAlignOptions = [
  {
    value: "Left",
    icon: AlignLeftIcon,
  },
  {
    value: "Center",
    icon: AlignCenterIcon,
  },
  {
    value: "Right",
    icon: AlignRightIcon,
  },
];

const textTransformOptions = [
  {
    value: "uppercase",
    icon: CaseUpperIcon,
  },
  {
    value: "lowercase",
    icon: CaseLowerIcon,
  },
  {
    value: "capitalize",
    icon: CaseSensitiveIcon,
  },
];

function Settings() {
  const { selectedElement, setSelectedElement } = useSelectedElement();
  const [element, setElement] = useState();

  useEffect(() => {
    if (selectedElement) {
      const currentElement = selectedElement.layout?.[selectedElement.index];
      console.log("Current element:", currentElement);
      setElement(currentElement);
    }
  }, [selectedElement]);

  const handleInputChange = (fieldName, value) => {
    if (!selectedElement) return;

    const updatedElement = { ...selectedElement };
    const newValue = value === "" ? " " : value;
    updatedElement.layout[updatedElement.index][fieldName] = newValue;
    console.log("Updated element after input change:", updatedElement);
    setSelectedElement(updatedElement);
  };

  const handleStyleChange = (fieldName, fieldValue) => {
    if (!selectedElement) return;

    const updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          style: {
            ...selectedElement.layout[selectedElement.index]?.style,
            [fieldName]: fieldValue,
          },
        },
      },
    };
    console.log("Updated element after style change:", updatedElement);
    setSelectedElement(updatedElement);
  };

  const handleOuterStyleChange = (fieldName, fieldValue) => {
    if (!selectedElement) return;

    const updatedElement = {
      ...selectedElement,
      layout: {
        ...selectedElement.layout,
        [selectedElement.index]: {
          ...selectedElement.layout[selectedElement.index],
          outerStyle: {
            ...selectedElement.layout[selectedElement.index]?.outerStyle,
            [fieldName]: fieldValue,
          },
        },
      },
    };
    console.log("Updated element after outer style change:", updatedElement);
    setSelectedElement(updatedElement);
  };

  return (
    <div className="w-full h-full border-2 shadow-md border-gray-300 p-2 flex flex-col gap-3">
      <h2 className="text-2xl font-bold pb-5">Settings</h2>

      {element?.imageUrl && (
        <ImagePreview
          label="Image"
          value={element.imageUrl}
          onHandleInputChange={(value) => handleInputChange("imageUrl", value)}
        />
      )}

      {element?.content && (
        <TextAreaField
          label="Content"
          value={element.content}
          onHandleInputChange={(value) => handleInputChange("content", value)}
        />
      )}
      {element?.textarea && (
        <TextAreaField
          label="Textarea"
          value={element.textarea}
          onHandleInputChange={(value) => handleInputChange("textarea", value)}
        />
      )}

      {element?.style?.backgroundColor && (
        <ColorPickerField
          label="Background Color"
          value={element.style.backgroundColor}
          onHandleStyleChange={(value) =>
            handleStyleChange("backgroundColor", value)
          }
        />
      )}
      {element?.url && (
        <InputField
          label="URL"
          value={element.url}
          onHandleInputChange={(value) => handleInputChange("url", value)}
        />
      )}
      {element?.style?.color && (
        <ColorPickerField
          label="Text Color"
          value={element.style.color}
          onHandleStyleChange={(value) => handleStyleChange("color", value)}
        />
      )}
      {element?.style?.fontSize && (
        <InputStyleField
          label="Font Size"
          value={element?.style?.fontSize}
          onHandleStyleChange={(value) => {
            handleStyleChange("fontSize", value + "px");
          }}
        />
      )}
      {element?.style?.padding && (
        <InputStyleField
          label="Padding"
          value={element?.style?.padding}
          onHandleStyleChange={(value) => {
            handleStyleChange("padding", value + "px");
          }}
        />
      )}
      {element?.style?.borderRadius && (
        <SliderField
          label="Border Radius"
          value={element?.style?.borderRadius}
          onHandleStyleChange={(value) => {
            handleStyleChange("borderRadius", value + "px");
          }}
        />
      )}
      {element?.style?.width && (
        <SliderField
          label="Width"
          value={element?.style?.width}
          onHandleStyleChange={(value) => {
            handleStyleChange("width", value + "%");
          }}
        />
      )}
      {element?.style?.textAlign && (
        <ToggleGroupField
          label="Text Align"
          value={element?.style?.textAlign}
          onHandleStyleChange={(value) => {
            handleStyleChange("textAlign", value);
          }}
          options={textAlignOptions}
        />
      )}

      {element?.style?.textTransform && (
        <ToggleGroupField
          label="Text Transform"
          value={element?.style?.textTransform}
          onHandleStyleChange={(value) =>
            handleStyleChange("textTransform", value)
          }
          options={textTransformOptions}
        />
      )}
      {element?.outerStyle?.backgroundColor && (
        <>
          <h2 className="text-lg font-bold">Outer Style</h2>
          <ColorPickerField
            label="Background Color"
            value={element.outerStyle.backgroundColor}
            onHandleStyleChange={(value) =>
              handleOuterStyleChange("backgroundColor", value)
            }
          />
        </>
      )}

      {element?.socialIcons && (
        <SocialIconField
          url={element.url}
          icon={element.icon}
          application={element.application}
        />
      )}
    </div>
  );
}

export default Settings;
