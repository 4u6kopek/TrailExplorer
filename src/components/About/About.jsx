import React from "react";
import { Link } from 'react-router-dom';
import "./About.css";
import { FaMountain, FaRoute, FaUsers, FaLeaf } from "react-icons/fa";
import Footer from "../Footer/Footer";

function About() {
  return (
    <>
      <div className="about-container">
        <div className="about-hero">
          <h1>Explore Nature with TrailExplorer</h1>
          <p>Your gateway to unforgettable outdoor adventures</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <div className="about-text">
              <h2>Our Mission</h2>
              <p>
                TrailExplorer connects outdoor enthusiasts with the world's most
                breathtaking trails. We're dedicated to helping you discover,
                plan, and share your hiking adventures with our community of
                nature lovers.
              </p>
            </div>
            <div className="about-icon">
              <FaMountain size={60} color="#4CAF50" />
            </div>
          </section>

          <section className="about-section reverse">
            <div className="about-icon">
              <FaRoute size={60} color="#4CAF50" />
            </div>
            <div className="about-text">
              <h2>What We Offer</h2>
              <ul>
                <li>Curated collection of hiking trails worldwide</li>
                <li>Detailed trail information and difficulty ratings</li>
                <li>User-generated reviews and photos</li>
                <li>Save and share your favorite trails</li>
              </ul>
            </div>
          </section>

          <section className="about-section">
            <div className="about-text">
              <h2>Join Our Community</h2>
              <p>
                Become part of a growing community that shares your passion for
                the outdoors. Together we're building the most comprehensive
                trail database while promoting responsible outdoor recreation.
              </p>
            </div>
            <div className="about-icon">
              <FaUsers size={60} color="#4CAF50" />
            </div>
          </section>

          <section className="about-cta">
            <FaLeaf size={50} color="#4CAF50" />
            <h2>Start Exploring Today</h2>
            <p>Your next adventure is just a click away</p>
            <Link to="/register" className="cta-button">
              Join Now
            </Link>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default About;
