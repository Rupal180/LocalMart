const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();

const PORT = process.env.PORT || 5000;

// ==================== MIDDLEWARE ====================

app.use(cors());
app.use(express.json());

// ==================== ROUTES ====================

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
// ==================== TEST ROUTE ====================

app.get("/", (req, res) => {
  res.json({
    message: "LocalMart Backend is running!",
  });
});

// ==================== MONGODB CONNECTION ====================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });

// ==================== START SERVER ====================

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});