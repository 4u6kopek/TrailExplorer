import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Cards from "../Cards/Cards";
import "./Adventures.css";
import { useAuth } from "../../context/AuthContext";
import Footer from "../Footer/Footer";

function Adventures() {
  const [allTrails, setAllTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    const fetchTrails = async () => {
      try {
        const response = await fetch(
          "https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/trails"
        );
        if (!response.ok) throw new Error("Failed to fetch trails");
        const data = await response.json();
        setAllTrails(data);
        setFilteredTrails(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchTrails();
  }, []);

  useEffect(() => {
    let result = [...allTrails];

    const difficulty = searchParams.get("difficulty");
    if (difficulty) {
      result = result.filter((trail) => trail.difficulty === difficulty);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter((trail) =>
        trail.name.toLowerCase().includes(query)
      );
    }

    setFilteredTrails(result);
  }, [searchParams, searchQuery, allTrails]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleDifficultyFilter = (difficulty) => {
    const newParams = new URLSearchParams();
    if (difficulty) newParams.set("difficulty", difficulty);
    setSearchParams(newParams);
  };

  if (authLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <div className="adventures-container">
        <h1>All Adventures</h1>

        <div className="search-filters">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by trail name..."
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="filters">
            <h3>Filter by Difficulty:</h3>
            <div className="filter-buttons">
              <button
                onClick={() => handleDifficultyFilter("")}
                className={`filter-button ${
                  !searchParams.get("difficulty") ? "active" : ""
                }`}
              >
                All
              </button>
              <button
                onClick={() => handleDifficultyFilter("easy")}
                className={`filter-button ${
                  searchParams.get("difficulty") === "easy" ? "active" : ""
                }`}
              >
                Easy
              </button>
              <button
                onClick={() => handleDifficultyFilter("moderate")}
                className={`filter-button ${
                  searchParams.get("difficulty") === "moderate" ? "active" : ""
                }`}
              >
                Moderate
              </button>
              <button
                onClick={() => handleDifficultyFilter("hard")}
                className={`filter-button ${
                  searchParams.get("difficulty") === "hard" ? "active" : ""
                }`}
              >
                Hard
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <>
            {filteredTrails.length === 0 ? (
              <div className="no-results">
                No trails found matching your criteria.
              </div>
            ) : (
              <Cards trails={filteredTrails} />
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Adventures;
