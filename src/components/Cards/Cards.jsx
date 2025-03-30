import React from "react";
import "./Cards.css";
import CardItem from "../CardItem/CardItem";

const Cards = ({ trails }) => {
  // First check if trails exists and is an array
  if (!trails || !Array.isArray(trails)) {
    console.error("Invalid trails data:", trails);
    return (
      <div className="cards">
        <h1>Explore Trails</h1>
        <div className="error-message">
          Unable to load trails. Please try again later.
        </div>
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
                // Safely access trail properties with defaults
                const trailId = trail?._id?.$oid || trail?._id || Math.random();
                const description =
                  trail?.description || "No description available";

                return (
                  <CardItem
                    key={trailId}
                    id={trailId}
                    src={trail?.image || "/img-default.jpg"}
                    title={trail?.name || "Unnamed Trail"}
                    text={
                      description.length > 100
                        ? `${description.substring(0, 100)}...`
                        : description
                    }
                    fullText={description}
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
            <p>No trails found. Be the first to create one!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
