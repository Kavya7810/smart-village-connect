import React, { useState, useEffect } from "react";
import "../../styles/adminProjectTracking.css";

const AdminProjectTracking = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Planned");
  const [timeline, setTimeline] = useState("");
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  // Show success or error messages
  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  // Fetch projects from backend
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("http://localhost:8080/projects");
        const data = await res.json();
        setProjects(data);
      } catch (err) {
        console.error("Failed to fetch projects:", err);
      }
    };

    fetchProjects();
  }, []);

  // Handle Add Project
  const handleAddProject = async () => {
    if (!title || !description || !timeline) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    try {
      const res = await fetch("http://localhost:8080/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status, timeline }),
      });

      if (res.ok) {
        const newProject = await res.json();
        setProjects([...projects, newProject]);
        showMessage("Project added successfully!");

        // Reset form
        setTitle("");
        setDescription("");
        setStatus("Planned");
        setTimeline("");
      } else {
        showMessage("Failed to add project", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      showMessage("Server error", "error");
    }
  };

  return (
    <div className="admin-project-container">
      <h2>Government Project Tracking - Admin Panel</h2>
      <h3>Add New Project</h3>

      {message && <div className={`message ${messageType}`}>{message}</div>}

      <div className="admin-form">
        <input
          type="text"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="Planned">Planned</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <input
          type="text"
          placeholder="Timeline (e.g. Jan - May 2025)"
          value={timeline}
          onChange={(e) => setTimeline(e.target.value)}
        />

        <button onClick={handleAddProject}>Add Project</button>
      </div>

      <div className="project-list">
        {projects.length === 0 ? (
          <p>No projects available.</p>
        ) : (
          <ul>
          {projects.map((project) => (
            <li key={project._id}>
              <strong>{project.title}</strong>
              <span className={`status-badge ${project.status.replace(/\s/g, "").toLowerCase()}`}>
                {project.status}
              </span>
              <br />
              <small>{project.timeline}</small>
              <br />
              <p>{project.description}</p>
            </li>
          ))}
        </ul>
        
        )}
      </div>
    </div>
  );
};

export default AdminProjectTracking;
