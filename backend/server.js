import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app = express();

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Optional static folder for local files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Connect MongoDB
connectDB();

// Routes
app.use("/api/products", productRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// Catch-all unknown routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.get("/api/products/test", (req, res) => {
  res.json({ message: "Route works!" });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
