import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { 
  FaMapMarkerAlt, 
  FaRoute, 
  FaClock, 
  FaHeart,
  FaArrowLeft
} from "react-icons/fa";
import "./TrailDetails.css";

export default function TrailDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();

  // Add loading state to prevent flickering
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (state) {
      setIsLoading(false);
    } else {
      navigate("/");
    }
  }, [state, navigate]);

  if (isLoading) {
    return <div className="loading">Loading trail details...</div>;
  }

  return (
    <div className="trail-details">
      <button onClick={() => navigate(-1)} className="back-button">
        <FaArrowLeft /> Back to Trails
      </button>
      
      <div className="trail-content">
        <h2 className="trail-title">{state.title || "Unnamed Trail"}</h2>
        
        {state.image && (
          <div className="trail-image">
            <img 
              src={state.image} 
              alt={state.title}
              onError={(e) => {
                e.target.src = "/img-default.jpg";
              }}
            />
          </div>
        )}

        <div className="trail-meta">
          <span className="meta-item">
            <FaMapMarkerAlt className="icon" /> {state.location || "Unknown location"}
          </span>
          <span className="meta-item">
            <FaRoute className="icon" /> {state.length || "0 km"}
          </span>
          <span className="meta-item">
            <FaClock className="icon" /> {state.duration || "0 hours"}
          </span>
          <span className="meta-item">
            <FaHeart className="icon" /> {state.likes || 0}
          </span>
          {/* Single difficulty display */}
          <span className={`difficulty-badge difficulty-${state.difficulty || "easy"}`}>
            {state.difficulty?.toUpperCase() || "EASY"}
          </span>
        </div>

        <div className="trail-description">
          <h3>Description</h3>
          <p>{state.fullDescription || "No detailed description available"}</p>
        </div>
      </div>
    </div>
  );
}