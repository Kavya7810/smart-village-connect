import React from 'react';
import ProjectList from './ProjectList';
import '../../styles/VillagerProjectTracking.css';

const dummyProjects = [
  {
    title: "Water Supply Upgrade",
    description: "Improving water pipeline systems in all villages.",
    status: "Ongoing",
    timeline: "Feb 2025 - Dec 2025"
  },
  {
    title: "Solar Panel Distribution",
    description: "Free solar panel installations to 500 houses.",
    status: "Planned",
    timeline: "Mar 2025 - Nov 2025"
  }
];

const VillagerProjectTracking = () => {
  return (
    <div className="project-tracking-container">
      <h2>Government Project Tracking</h2>
      <p className="description">Transparency on projects happening in your village.</p>
      <ProjectList projects={dummyProjects} />
    </div>
  );
};

export default VillagerProjectTracking;