"use client";

// Import necessary modules and hooks
import React, { useState, useRef, useEffect } from "react";
import {
  useScreenSize,
  useDragDropElement,
  useEmailTemplate,
} from "@/app/provider";
import ColumnLayout from "../LayoutElements/ColumnLayout";
import ViewHtmlDialog from "./ViewHtmlDialog";

function Canvas({ viewHTMLCode, closeDialog }) {
  const htmlRef = useRef();
  const { screenSize, setScreenSize } = useScreenSize();
  const { dragDropElement, setDragDropElement } = useDragDropElement();
  const { emailTemplate, setEmailTemplate } = useEmailTemplate();
  const [HTMLCode, setHTMLCode] = useState()

  // Local state for drag over effect
  const [dragOver, setDragOver] = useState(false);

  // Handle drag over event
  const onDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
    // console.log('over');
  };

  // Handle drop event
  const onDropHandle = () => {
    // console.log('drop...');
    setDragOver(false);
    console.log(dragDropElement?.dragLayout);
    if (dragDropElement?.dragLayout) {
      setEmailTemplate((prev) => [...prev, dragDropElement?.dragLayout]);
    }
  };

  const getLayoutComponent = (layout) => {
    if (layout.type === "column") {
      return <ColumnLayout layout={layout} />;
    }
  };

  useEffect(() => {
    viewHTMLCode && getHTMLCode();
  }, [viewHTMLCode]);

  const getHTMLCode = () => {
    if (htmlRef.current) {
      const htmlContent = htmlRef.current.innerHTML;
      // console.log(htmlContent);
      setHTMLCode(htmlContent);
    }
  };

  // Render the component
  return (
    <div className="bg-gray-100 flex justify-center items-center h-full w-full ">
      <div
        className={`w-full bg-white max-w-2xl  p-6 
          ${screenSize === "desktop" ? "max-w-2xl" : "max-w-lg"}
         ${dragOver && "border-2 border-blue-500  p-4"}
          `}
        onDragOver={onDragOver}
        onDrop={() => onDropHandle()}
        ref={htmlRef}
      >
        {emailTemplate?.length > 0 ? (
          emailTemplate?.map((layout, index) => (
            <div key={index}>{getLayoutComponent(layout)}</div>
          ))
        ) : (
          <div>
            <h1 className="text-center text-gray-500">
              No email template found
            </h1>
          </div>
        )}
      </div>
      <ViewHtmlDialog
        openDialog={viewHTMLCode}
        htmlCode={HTMLCode}
        closeDialog = {closeDialog}
      />
    </div>
  );
}

// Export the Canvas component
export default Canvas;
