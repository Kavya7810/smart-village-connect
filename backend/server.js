require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const RegisterModel = require('./models/Register');
const LoginRoute = require("./models/Login");
const newsRoutes = require("./news");
const appointmentRoutes = require("./routes/appointments");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders"); // 🆕 Add this
const projectRoutes = require("./routes/projects");
const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("❌ MongoDB Error:", err));

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const existingUser = await RegisterModel.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new RegisterModel({ name, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

app.use("/login", LoginRoute);
app.use("/news", newsRoutes);
app.use("/appointments/book", appointmentRoutes);
app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/projects", projectRoutes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
