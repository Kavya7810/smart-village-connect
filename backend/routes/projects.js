const express = require("express");
const router = express.Router();
const Project = require("../models/Project");

// Add new project
router.post("/", async (req, res) => {
  try {
    const newProject = new Project(req.body);
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: "Failed to create project", error: err });
  }
});

// Get all projects
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch projects", error: err });
  }
});

module.exports = router;
