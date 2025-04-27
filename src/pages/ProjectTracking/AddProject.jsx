import React, { useState } from 'react';
import '../../styles/addProject.css';

const AddProject = ({ onAdd }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Planned',
    timeline: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: '', description: '', status: 'Planned', timeline: '' });
  };

  return (
    <form className="add-project-form" onSubmit={handleSubmit}>
      <h3>Add New Project</h3>
      <input name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" required />
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Project Description" required />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Planned</option>
        <option>Ongoing</option>
        <option>Completed</option>
      </select>
      <input name="timeline" value={formData.timeline} onChange={handleChange} placeholder="Timeline (e.g. Jan - May 2025)" />
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProject;