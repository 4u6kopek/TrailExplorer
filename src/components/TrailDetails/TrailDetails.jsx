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

        <div className="trail-meta">
          <div className="meta-item">
            <FaMapMarkerAlt className="icon" />{" "}
            {state.location || "Unknown location"}
          </div>
          <div className="meta-item">
            <FaRoute className="icon" /> {state.length || 0} km
          </div>
          <div className="meta-item">
            <FaClock className="icon" /> {state.duration || 0} hours
          </div>
          <div className="meta-item">
            <span
              className={`difficulty-badge difficulty-${
                state.difficulty || "easy"
              }`}
            >
              {(state.difficulty || "easy").toUpperCase()}
            </span>
          </div>
          <div className="meta-item">
            <FaHeart className="icon" /> {state.likes || 0} likes
          </div>
        </div>

        <div className="trail-description">
          <h3>Description</h3>
          <p>
            {state.description || state.fullText || "No description available"}
          </p>
        </div>
      </div>
    </div>
  );
}
