import React, { memo } from "react";
import "./Cards.css";
import CardItem from "../CardItem/CardItem";

const Cards = ({ trails }) => {
  if (!trails || !Array.isArray(trails)) {
    return (
      <div className="cards">
        <h1>Explore Trails</h1>
        <div className="error-message">Unable to load trails.</div>
      </div>
    );
  }

  return (
    <div className="cards">
      <h1>Explore Trails</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          {trails.length > 0 ? (
            <ul className="cards__items">
              {trails.map((trail) => {
                const trailId = trail?._id || `${trail.name}-${trail.location}`;
                const shortDescription = trail?.description
                  ? trail.description.length > 100
                    ? `${trail.description.substring(0, 100)}...`
                    : trail.description
                  : "No description available";

                return (
                  <CardItem
                    key={trailId}
                    id={trailId}
                    src={trail?.imageUrl || "/images/img-1.jpg"}
                    title={trail?.name || "Unnamed Trail"}
                    text={shortDescription}
                    fullText={trail?.description}
                    location={trail?.location || "Unknown location"}
                    difficulty={trail?.difficulty || "easy"}
                    length={`${trail?.length || 0} km`}
                    duration={`${trail?.duration || 0} hours`}
                    likes={trail?.likes || 0}
                  />
                );
              })}
            </ul>
          ) : (
            <p className="no-trails">No trails found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(Cards);
