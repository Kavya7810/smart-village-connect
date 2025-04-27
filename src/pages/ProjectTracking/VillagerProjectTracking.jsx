import React, { useEffect, useState } from 'react';
import ProjectList from './ProjectList';
import '../../styles/VillagerProjectTracking.css';

const VillagerProjectTracking = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:8080/projects");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="tracking">
      <div className="project-tracking-container">
        <h2>Government Project Tracking</h2>
        <p className="description">Transparency on projects happening in your village.</p>
        <ProjectList projects={projects} />
      </div>
    </div>
  );
};

export default VillagerProjectTracking;
