import React from "react";
import "../styles/About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-main-card">
        <h1>About Smart Village Connect</h1>
        <p className="first-p">
          This platform is designed to connect and empower rural communities. We bring modern technology, 
          smart infrastructure, and agricultural innovation to enhance the quality of life in villages.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h2>Market Price</h2>
            <p>Stay updated with real-time agricultural market prices to help farmers make informed decisions.</p>
          </div>

          <div className="feature-card">
            <h2>Project Tracking</h2>
            <p>Track the progress of developmental and government projects in your village.</p>
          </div>

          <div className="feature-card">
            <h2>Healthcare</h2>
            <p>Access basic healthcare services, teleconsultation, and health tips for rural well-being.</p>
          </div>

          <div className="feature-card">
            <h2>News</h2>
            <p>Get the latest local news, government schemes, and village updates all in one place.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
