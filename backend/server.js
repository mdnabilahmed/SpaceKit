import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder for images
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/products", productRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "Backend is alive!" });
});

// Catch-all unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
