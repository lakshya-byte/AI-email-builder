import React from 'react'

const ImageComponent = ({ style, imageUrl, content, outerStyle }) => {
  return (
    <div style={outerStyle}>
      <img src={imageUrl} alt="image" style={style} />
    </div>
  );
};

export default ImageComponent
