import React from 'react'

const DividerComponent = ({ style, outerStyle }) => {
  return (
    <div style={outerStyle}>
      <hr style={style} />
    </div>
  );
};

export default DividerComponent
