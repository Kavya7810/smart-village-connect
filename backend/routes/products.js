const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add new product
router.post("/add", async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const newProduct = new Product({ name, price, image });
    await newProduct.save();
    res.status(201).json({ message: "Product added", product: newProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
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
// Update only price by product ID
router.put("/:id/price", async (req, res) => {
  try {
    const { id } = req.params;
    const { price } = req.body;

    if (!price || isNaN(price)) {
      return res.status(400).json({ message: "Invalid price value" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Price updated", product: updatedProduct });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});


module.exports = router;
