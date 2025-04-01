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

const difficultyColors = {
  easy: {
    primary: "#4CAF50",
    secondary: "rgba(76, 175, 80, 0.08)",
    badge: "rgba(76, 175, 80, 0.2)",
  },
  moderate: {
    primary: "#FFA000",
    secondary: "rgba(255, 160, 0, 0.08)",
    badge: "rgba(255, 160, 0, 0.2)",
  },
  hard: {
    primary: "#D32F2F",
    secondary: "rgba(211, 47, 47, 0.08)",
    badge: "rgba(211, 47, 47, 0.2)",
  },
};

export default function TrailDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const currentDifficulty = state?.difficulty || "easy";
  const colors = difficultyColors[currentDifficulty] || difficultyColors.easy;

  if (!state) {
    return (
      <div className="error">
        Trail data not found.{" "}
        <button onClick={() => navigate("/")}>Return home</button>
      </div>
    );
  }

  return (
    <div
      className="trail-details"
      style={{ "--trail-image": `url(${state.imageUrl})` }}
    >
      <div className="trail-content-wrapper">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back to Trails
        </button>

        <div className="trail-content">
          <div
            className="trail-header"
            style={{
              backgroundColor: colors.secondary,
              "--underline-color": colors.primary,
            }}
          >
            <h2 className="trail-title">{state.title || "Unnamed Trail"}</h2>
            <span
              className="difficulty-badge"
              style={{
                backgroundColor: colors.badge,
                color: colors.primary,
              }}
            >
              {(state.difficulty || "easy").toUpperCase()}
            </span>
          </div>

          <div className="trail-image-container">
            <img
              src={state.imageUrl}
              alt={state.title}
              onError={(e) => (e.target.src = "/images/img-1.jpg")}
              className="trail-image"
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
              <FaHeart className="icon" /> {state.likes || 0} likes
            </div>
          </div>

          <div className="trail-description">
            <h3>Description</h3>
            <p>{state.description || "No description available"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
