import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Admin.css";

const Admin = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      <div className="admin-overlay">
        <h2 class="head">Welcome Admin 👋</h2>
        <p>Select functionality of Admin:</p>
        <div className="admin-buttons">
          <button onClick={() => navigate("/add-news")}>📰 Post News</button>
          <button onClick={() => navigate("/admin-project-tracking")}>🏗️ Track Projects</button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
