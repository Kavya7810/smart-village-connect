import React from "react";
import { useNavigate } from "react-router-dom";

const ProjectTracking = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ color: '#00ffe0' }}>Project Tracking</h1>
      <p style={{ color: '#ccc', fontSize: '18px', marginBottom: '30px' }}>
        Select your role to view or manage projects.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <button
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#00ffe0",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/admin-project-tracking")}
        >
          🧑‍💼 Admin View
        </button>
        <button
          style={{
            padding: "15px 30px",
            fontSize: "16px",
            backgroundColor: "#00ffe0",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => navigate("/villager-project-tracking")}
        >
          👨‍🌾 Villager View
        </button>
      </div>
    </div>
  );
};

export default ProjectTracking;