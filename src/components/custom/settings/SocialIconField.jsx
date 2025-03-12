import React from "react";

const SocialIconField = ({ url, icon, application }) => {
    console.log(application);
    console.log(icon);
    console.log(url);
    
  return (
    <a href={url} target="_blank" rel="noopener noreferrer">
      <img src={icon} alt={application} onClick={(e) => console.log(e.target.value)} />
    </a>
  );
};

export default SocialIconField;

