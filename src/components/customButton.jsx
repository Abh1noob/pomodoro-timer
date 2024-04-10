import React from 'react';

const CustomButton = ({
  durationBackgroundColor,
  context,
  description,
  handleChange,
}) => {
  return (
    <div className="duration-settings" style={{ backgroundColor: durationBackgroundColor }}>
      <button className="arrow-button" onClick={() => handleChange(1)}>
        ↑
      </button>
      <p>{context}</p>
      <button className="arrow-button" onClick={() => handleChange(-1)}>
        ↓
      </button>
      <p className="duration-settings-text">{description}</p>
    </div>
  );
};

export default CustomButton;
