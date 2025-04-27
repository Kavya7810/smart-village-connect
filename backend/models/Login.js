const express = require('express');
const router = express.Router();
const RegisterModel = require('../models/Register');

router.post('/', async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const user = await RegisterModel.findOne({ email, password, role });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Return name if Doctor
    const responseData = {
      message: "Login successful",
      email: user.email,
      role: user.role
    };

    if (user.role === "Doctor") {
      responseData.name = user.name || "Unknown"; // send doctor's name
    }

    res.json(responseData);
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
