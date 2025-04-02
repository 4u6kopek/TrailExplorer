import React from "react";
import "../../App.css";
import Button from "../Button/Button";
import "./HeroSection.css";

function HeroSection() {
  const scrollToTrails = () => {
    const trailsSection = document.querySelector(".trails-container");
    trailsSection.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="hero-container">
      <video src="/videos/video-1.mp4" autoPlay loop muted />
      <h1>ADVENTURE AWAITS</h1>
      <p>What are you waiting for?</p>
      <div className="hero-btns">
        <Button
          className="btns"
          buttonStyle="btn--outline"
          buttonSize="btn--large"
          onClick={scrollToTrails}
        >
          GET STARTED
        </Button>
        <Button
          className="btns"
          buttonStyle="btn--primary"
          buttonSize="btn--large"
        >
          VIEW DEMO <i className="far fa-play-circle" />
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
