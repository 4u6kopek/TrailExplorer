import React from "react";
import "./Cards.css";
import CardItem from "../CardItem/CardItem";

const Cards = ({ trails }) => {
  return (
    <div className="cards">
      <h1>Check out these EPIC Destinations!</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            {trails.length > 0 ? (
              trails.map((trail) => (
                <CardItem
                  key={trail._id}
                  src={trail.image || "/img-1.jpg"}
                  text={trail.description}
                  label={trail.category}
                  path={`/trail/${trail._id}`} // Use MongoDB _id in URL
                />
              ))
            ) : (
              <p>No trails found.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Cards;
