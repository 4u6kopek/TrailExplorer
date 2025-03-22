import React from "react";
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline", "btn--test"];
const SIZES = ["btn--medium", "btn--large"];

const Button = ({
  children,
  type = "button",
  onClick,
  buttonStyle = STYLES[0],
  buttonSize = SIZES[0],
  to,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

  const Component = to ? Link : "button";

  return (
    <Component
      to={to}
      className={`btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={onClick}
      type={!to ? type : undefined}
    >
      {children}
    </Component>
  );
};

export default Button;
