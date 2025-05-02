const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

// POST /appointments/book
router.post("/", async (req, res) => {
  const { name, doctor, date, time, email } = req.body;

  if (!name || !doctor || !date || !time) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newAppointment = new Appointment({ name, doctor, date, time, email });
    await newAppointment.save();
    console.log("✅ Appointment received:", req.body);
    res.status(200).json({ message: "Appointment booked successfully" });
  } catch (err) {
    console.error("❌ Error saving appointment:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /appointments/book
router.get("/", async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.status(200).json(appointments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Appointment.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Appointment not found" });
    res.json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
