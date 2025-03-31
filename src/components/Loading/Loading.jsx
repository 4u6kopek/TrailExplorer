import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-overlay">
      <div className="loading-spinner"></div>
      <p>Loading trails...</p>
    </div>
  );
};

export default Loading;
