import React from "react";

const HideText = ({ text, isHidden }) => {
  return <span>{isHidden ? "****" : text}</span>;
};

export default HideText;
