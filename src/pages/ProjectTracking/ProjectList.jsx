import React from 'react';
import ProjectCard from './ProjectCard';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list">
      {projects.length === 0 ? (
        <p>No projects available.</p>
      ) : (
        projects.map((project, index) => <ProjectCard key={index} project={project} />)
      )}
    </div>
  );
};

export default ProjectList;