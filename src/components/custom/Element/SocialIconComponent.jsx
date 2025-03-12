import React from "react";

const SocialIconComponent = ({ style, outerStyle, socialIcons }) => {
  return (
    <div style={outerStyle}>
      {socialIcons || []?.map((icon, index) => {
        return (
          <img
            src={icon.icon}
            alt="social icon"
            style={style}
            key={index}
            className="cursor-pointer"
          />
        );
      })}
    </div>
  );
};

export default SocialIconComponent;
