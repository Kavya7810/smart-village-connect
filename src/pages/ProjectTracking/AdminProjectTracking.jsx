import React, { useState } from "react";
import "../../styles/adminProjectTracking.css";

const AdminProjectTracking = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("Planned");
  const [timeline, setTimeline] = useState("");
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleAddProject = () => {
    if (!title || !description || !timeline) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    const newProject = {
      id: Date.now(),
      title,
      description,
      status,
      timeline,
    };

    setProjects([...projects, newProject]);
    showMessage("Project added successfully!");

    setTitle("");
    setDescription("");
    setStatus("Planned");
    setTimeline("");
  };

  return (
    <div className="admin-project-container">
      <h2>Government Project Tracking - Admin Panel</h2>
      <h3>Add New Project</h3>

      {message && (
        <div className={`message ${messageType}`}>
          {message}
        </div>
      )}

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
              <li key={project.id}>
                <strong>{project.title}</strong> - {project.status}
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
