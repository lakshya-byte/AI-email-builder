import { Button } from "@/components/ui/button";
import React from "react";

const ButtonComponent = ({ style, content, url, outerStyle }) => {
  return (
    <div style={outerStyle}>
      <a href={url}>
        <button className="cursor-pointer " style={style}>
          {content}
        </button>
      </a>
    </div>
  );
};

export default ButtonComponent;
