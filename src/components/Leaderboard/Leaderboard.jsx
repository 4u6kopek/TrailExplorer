import React, { useEffect, useState } from "react";
import { FaTrophy, FaUser, FaHiking, FaCalendarAlt } from "react-icons/fa";
import "./Leaderboard.css";
import { useAuth } from "../../context/AuthContext";
import Footer from "../Footer/Footer";

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/users?leaderboard=true"
        );
        if (!response.ok) throw new Error("Failed to fetch leaderboard");
        const data = await response.json();
        setLeaderboard(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getMedalColor = (position) => {
    switch (position) {
      case 1:
        return "#FFD700"; // Gold
      case 2:
        return "#C0C0C0"; // Silver
      case 3:
        return "#CD7F32"; // Bronze
      default:
        return "#4CAF50"; // Green
    }
  };

  return (
    <>
      <div className="leaderboard-container">
        <div className="leaderboard-header">
          <h1>
            <FaTrophy /> Trail Explorers Leaderboard
          </h1>
          <p>Top contributors who've created the most trails</p>
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="leaderboard-content">
            <div className="leaderboard-list">
              {leaderboard.map((user, index) => (
                <div
                  key={user._id}
                  className={`leaderboard-item ${
                    currentUser?.uid === user._id ? "current-user" : ""
                  }`}
                >
                  <div className="user-rank">
                    <span
                      className="rank-badge"
                      style={{ backgroundColor: getMedalColor(index + 1) }}
                    >
                      {index + 1}
                    </span>
                  </div>
                  <div className="user-avatar">
                    <img
                      src={user.avatarUrl}
                      alt={user.username}
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${user.username}&background=random`;
                      }}
                    />
                  </div>
                  <div className="user-info">
                    <h3>{user.username}</h3>
                    <div className="user-stats">
                      <span>
                        <FaHiking /> {user.trailsCount} trails
                      </span>
                      <span>
                        <FaCalendarAlt />{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Leaderboard;
