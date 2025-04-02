import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaRoute,
  FaClock,
  FaHeart,
  FaArrowLeft,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import "./TrailDetails.css";
import SaveButton from "../SaveButton/SaveButton";

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
  const { currentUser } = useAuth();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const currentDifficulty = state?.difficulty || "easy";
  const colors = difficultyColors[currentDifficulty] || difficultyColors.easy;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this trail?")) return;

    if (!state.id || !currentUser?.uid) {
      setError("Missing trail ID or user ID");
      return;
    }

    setIsDeleting(true);
    setError("");

    try {
      const response = await fetch(
        `https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/trails?id=${encodeURIComponent(
          state.id
        )}&userId=${encodeURIComponent(currentUser.uid)}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Failed to delete trail");
      navigate("/", { state: { message: "Trail deleted successfully!" } });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  if (!state) {
    return (
      <div className="error">
        Trail data not found.{" "}
        <button onClick={() => navigate("/")}>Return home</button>
      </div>
    );
  }

  const isOwner = currentUser?.uid === state.userId;

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

          {error && <div className="error-message">{error}</div>}

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
              <FaRoute className="icon" /> {state.length || 0}
            </div>
            <div className="meta-item">
              <FaClock className="icon" /> {state.duration || 0} hours
            </div>
            <div className="meta-item">
              <SaveButton trailId={state.id} initialLikes={state.likes || 0} />
            </div>

            {isOwner && (
              <div className="meta-actions">
                <Link
                  to={`/edit-trail/${state.id}`}
                  state={state}
                  className="edit-button"
                >
                  <FaEdit /> Edit
                </Link>
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="delete-button"
                >
                  <FaTrash /> {isDeleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            )}
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
