const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  villagerName: { type: String, required: true },
  productName: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model("Order", orderSchema);
