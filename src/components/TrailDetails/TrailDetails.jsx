import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaClock,
  FaHeart,
  FaArrowLeft,
} from "react-icons/fa";
import "./TrailDetails.css";

export default function TrailDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="error">
        Trail data not found.{" "}
        <button onClick={() => navigate("/")}>Return home</button>
      </div>
    );
  }

  return (
    <div className="trail-details">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back to Trails
      </button>

      <div className="trail-content">
        <h2 className="trail-title">{state.title || "Unnamed Trail"}</h2>

        <div className="trail-image">
          <img
            src={state.imageUrl || "/images/img-1.jpg"}
            alt={state.title}
            onError={(e) => (e.target.src = "/images/img-1.jpg")}
          />
        </div>

        <div className="trail-meta"></div>

        <div className="trail-description">
          <h3>Description</h3>
          <p>{state.description || "No description available"}</p>
        </div>
      </div>
    </div>
  );
}
