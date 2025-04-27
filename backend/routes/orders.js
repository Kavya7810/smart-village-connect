// routes/orders.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const RegisterModel = require("../models/Register"); // Required to find villager by email

router.post("/", async (req, res) => {
  const { villagerName, productName, price } = req.body;

  try {
    const newOrder = new Order({ villagerName, productName, price });
    await newOrder.save();
    res.status(201).json({ message: "Order saved successfully" });
  } catch (err) {
    console.error("Order saving error:", err);
    res.status(500).json({ message: "Failed to save order" });
  }
});

// 🛠️ FIXED: Use /villager and query param `?email=value`
router.get("/villager", async (req, res) => {
  const { email } = req.query;

  try {
    const villager = await RegisterModel.findOne({ email });
    if (!villager) {
      return res.status(404).json({ error: "Villager not found" });
    }

    res.json({ name: villager.name });
  } catch (error) {
    console.error("Failed to fetch villager:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// Delete product by ID
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Product.findByIdAndDelete(id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err });
    }
  });
  
module.exports = router;
