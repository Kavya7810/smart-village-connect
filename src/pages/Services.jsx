import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Services.css"; // Import CSS file

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="services-page">
      <h1 className="services-title">OUR SERVICES</h1>
      <p className="services-description">
        Empowering villages with digital solutions: Healthcare, Marketplace,
        Project Tracking, and News Updates.
      </p>
      <div className="services-buttons">
        <button className="service-btn" onClick={() => navigate("/healthcare")}>
          🏥 Healthcare
        </button>
        <button
          className="service-btn"
          onClick={() => navigate("/marketplace")}
        >
          🛒 Marketplace
        </button>
        <button
          className="service-btn"
          onClick={() => navigate("/project-tracking")}
        >
          📊 Project Tracking
        </button>
        <button className="service-btn" onClick={() => navigate("/news")}>
          📰 News Updates
        </button>
      </div>
    </section>
  );
};

export default Services;
