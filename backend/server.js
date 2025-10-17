import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import buyNowRoutes from "./routes/buyNowRoutes.js";
dotenv.config();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Create uploads folder if missing
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use("/uploads", express.static(uploadsDir));

// ✅ Connect to MongoDB
connectDB();

// ✅ Main routes
app.use("/api/products", productRoutes);
app.use("/api/contactus", contactRoutes);
app.use("/api/buynow", buyNowRoutes);

// ✅ Default route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// ✅ 404 route handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ✅ Test route
app.get("/api/products/test", (req, res) => {
  res.json({ message: "Route works!" });
});

// ✅ Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
