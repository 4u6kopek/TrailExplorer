import React from "react";
import { Link } from "react-router-dom";

const CardItem = ({ path, label, src, text }) => (
  <li className="cards__item">
    <Link className="cards__item__link" to={path}>
      <figure className="cards__item__pic-wrap" data-category={label}>
        <img className="cards__item__img" alt="Travel" src={src} />
      </figure>
      <div className="cards__item__info">
        <h5 className="cards__item__text">{text}</h5>
      </div>
    </Link>
  </li>
);

CardItem.defaultProps = {
  path: "/default-path",
  label: "Default Label",
  src: "/default-img.jpg",
  text: "Default Text",
};

export default CardItem;
