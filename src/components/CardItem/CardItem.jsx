import React, { memo } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaRoute, FaClock, FaHeart } from "react-icons/fa";
import "./CardItem.css";

const CardItem = memo(
  ({
    id,
    src,
    title = "Unnamed Trail",
    text = "No description available",
    fullText = "No detailed description available",
    location = "Unknown location",
    difficulty = "easy",
    length = "0 km",
    duration = "0 hours",
    likes = 0,
  }) => {
    const handleImageError = (e) => {
      if (e.target.src !== "/images/img-1.jpg") {
        e.target.src = "/images/img-1.jpg";
      }
    };

    return (
      <li className="cards__item">
        <Link
          to={`/trail/${id}`}
          state={{
            title,
            fullDescription: fullText,
            location,
            difficulty,
            length,
            duration,
            likes,
            imageUrl: src,
          }}
          className="cards__item__link"
        >
          <div className="cards__item__pic-wrap">
            <img
              className="cards__item__img"
              src={src || "/images/img-1.jpg"}
              alt={title}
              onError={handleImageError}
              loading="lazy"
            />
            <span className={`difficulty-label difficulty-${difficulty}`}>
              {difficulty.toUpperCase()}
            </span>
          </div>
          <div className="cards__item__info">
            <h3 className="cards__item__title">{title}</h3>
            <p className="cards__item__location">
              <FaMapMarkerAlt className="icon" /> {location}
            </p>
            <p className="cards__item__text">{text}</p>
            <div className="cards__item__stats">
              <span className="cards__item__stat">
                <FaRoute className="icon" /> {length}
              </span>
              <span className="cards__item__stat">
                <FaClock className="icon" /> {duration}
              </span>
              <span className="cards__item__stat">
                <FaHeart className="icon" /> {likes}
              </span>
            </div>
          </div>
        </Link>
      </li>
    );
  }
);

export default CardItem;
