import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import CardItem from "../CardItem/CardItem";
import "./Profile.css";

export default function Profile() {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [createdTrails, setCreatedTrails] = useState([]);
  const [savedTrails, setSavedTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("created");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userRes = await fetch(
          `https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/users?id=${currentUser.uid}`
        );
        const userData = await userRes.json();
        setUserData(userData);

        const formatTrails = (trails) => {
          return (
            trails?.map((trail) => ({
              _id: trail._id,
              name: trail.name,
              description: trail.description,
              location: trail.location,
              difficulty: trail.difficulty,
              length: trail.length,
              duration: trail.duration,
              likes: trail.likes,
              imageUrl: trail.imageUrl,
              userId: trail.userId,
            })) || []
          );
        };

        setCreatedTrails(formatTrails(userData.createdTrails));
        setSavedTrails(formatTrails(userData.savedTrails));
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) fetchProfileData();
  }, [currentUser]);

  if (loading) {
    return (
      <div className="loading-spinner-container">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  const renderTrails = (trails) => {
    if (!trails || trails.length === 0) {
      return (
        <p className="no-trails-message">
          {activeTab === "created" ? (
            <>
              You haven't created any trails yet.{" "}
              <Link to="/create-trail">Start your first adventure!</Link>
            </>
          ) : (
            <>
              You haven't saved any trails yet.{" "}
              <Link to="/">Explore trails to save!</Link>
            </>
          )}
        </p>
      );
    }

    return (
      <div className="profile-trails-grid">
        {trails.map((trail) => (
          <CardItem
            key={trail._id}
            id={trail._id}
            src={trail.imageUrl || "/images/img-1.jpg"}
            title={trail.name || "Unnamed Trail"}
            text={
              trail.description
                ? trail.description.length > 100
                  ? `${trail.description.substring(0, 100)}...`
                  : trail.description
                : "No description available"
            }
            fullText={trail.description}
            location={trail.location || "Unknown location"}
            difficulty={trail.difficulty || "easy"}
            length={`${trail.length || 0} km`}
            duration={`${trail.duration || 0} hours`}
            likes={trail.likes || 0}
            userId={trail.userId}
            savedBy={trail.savedBy || []}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="avatar-container">
          <img
            src={userData?.avatarUrl || "/images/default-avatar.jpg"}
            alt="Profile"
            className="profile-avatar"
            onError={(e) => {
              e.target.src = "/images/default-avatar.jpg";
            }}
          />
        </div>
        <div className="profile-info">
          <h1>{userData?.username || "Trail Explorer"}</h1>
          <p className="profile-meta">
            <span>
              Member since: {new Date(userData?.createdAt).toLocaleDateString()}
            </span>
            <span>•</span>
            <span>{createdTrails.length} created trails</span>
            <span>•</span>
            <span>{savedTrails.length} saved trails</span>
          </p>
        </div>
      </div>

      <div className="trails-tabs">
        <button
          className={`tab-button ${activeTab === "created" ? "active" : ""}`}
          onClick={() => setActiveTab("created")}
        >
          Your Adventures
        </button>
        <button
          className={`tab-button ${activeTab === "saved" ? "active" : ""}`}
          onClick={() => setActiveTab("saved")}
        >
          Saved Trails
        </button>
      </div>

      <section className="trails-section">
        <h2>
          {activeTab === "created"
            ? "Trails You've Created"
            : "Your Saved Trails"}
        </h2>
        {activeTab === "created"
          ? renderTrails(createdTrails)
          : renderTrails(savedTrails)}
      </section>
    </div>
  );
}
