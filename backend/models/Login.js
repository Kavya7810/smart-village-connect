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

    // ✅ Return email and role
    res.json({
      message: "Login successful",
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
