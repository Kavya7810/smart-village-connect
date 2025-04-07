import React from 'react';


const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <h4>{project.title}</h4>
      <p>{project.description}</p>
      <p>Status: <strong>{project.status}</strong></p>
      <p>Timeline: {project.timeline}</p>
    </div>
  );
};

export default ProjectCard;