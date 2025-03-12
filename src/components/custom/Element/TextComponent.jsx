import React from "react";

const TextComponent = ({ style, textarea, outerStyle }) => {
      return (
    <div style={outerStyle}>
      <h2 style={style}>{textarea}</h2>
    </div>
  );
};

export default TextComponent;
