import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ src, text, label, path }) => {
  return (
    <li className="card-item">
      <Link className="card-item__link" to={path}>
        <figure className="card-item__pic-wrap" data-category={label}>
          <img src={src} alt="Trail" className="card-item__img" />
        </figure>
        <div className="card-item__info">
          <h5 className="card-item__text">{text}</h5>
        </div>
      </Link>
    </li>
  );
};

export default CardItem;
