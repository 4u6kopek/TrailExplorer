import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./SaveButton.css";

const SaveButton = ({ trailId, initialLikes, initialSaved, currentUser }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [likes, setLikes] = useState(initialLikes);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsSaved(initialSaved);
    setLikes(initialLikes);
  }, [initialSaved, initialLikes]);

  const handleSave = async (e) => {
    e?.preventDefault();
    e?.stopPropagation();

    if (!currentUser) {
      navigate("/login", { state: { from: window.location.pathname } });
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/trails?action=save`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            trailId,
            userId: currentUser.uid,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to save trail");

      const data = await response.json();

      setIsSaved(data.isSaved);
      setLikes(data.likes);

      const savedTrails = JSON.parse(
        localStorage.getItem("savedTrails") || "{}"
      );
      localStorage.setItem(
        "savedTrails",
        JSON.stringify({
          ...savedTrails,
          [trailId]: data.isSaved,
        })
      );
    } catch (error) {
      console.error("Error saving trail:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className={`save-button ${isSaved ? "saved" : ""}`}
      onClick={handleSave}
      disabled={isLoading}
      aria-label={isSaved ? "Unsave trail" : "Save trail"}
    >
      {isSaved ? (
        <FaHeart className="icon" style={{ color: "#f44336" }} />
      ) : (
        <FaRegHeart className="icon" style={{ color: "#f44336" }} />
      )}
      <span className="likes-count">{likes}</span>
    </button>
  );
};

export default SaveButton;
