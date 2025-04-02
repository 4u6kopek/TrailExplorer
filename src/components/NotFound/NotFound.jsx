import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-text">
          The path you're looking for doesn't exist. Maybe it's been removed or
          you took a wrong turn.
        </p>
        <Link to="/" className="not-found-button">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
