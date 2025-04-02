import React, { useEffect, useState } from "react";
import "../../App.css";
import "./Home.css";
import Cards from "../Cards/Cards";
import HeroSection from "../HeroSection/HeroSection";
import Footer from "../Footer/Footer";
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const [trails, setTrails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    fetch(
      "https://trail-explorer-backend-git-main-bogomils-projects-951e1882.vercel.app/api/trails"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch trails");
        return res.json();
      })
      .then((data) => {
        setTrails(data.slice(0, 6));
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (authLoading) {
    return (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <div className="trails-container">
        {loading ? (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        ) : error ? (
          <div className="error-message">Error: {error}</div>
        ) : (
          <>
            <Cards trails={trails} />
            <div className="view-all-container">
              <Link to="/adventures" className="view-all-button">
                View All Adventures →
              </Link>
            </div>
          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
