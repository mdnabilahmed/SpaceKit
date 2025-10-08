import express from "express";
import upload from "../middleware/upload.js";
import {
  addProduct,
  getProducts,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Add a new product (upload image via Cloudinary)
router.post("/add", upload.single("image"), addProduct);

// Get all products
router.get("/send", getProducts);

// Get single product by ID
router.get("/send/:id", getProductById);

export default router;
