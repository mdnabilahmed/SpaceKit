import express from "express";
import multer from "multer";
import {
  addProduct,
  getProducts,
  getProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

// ✅ Multer config (temporary upload before Cloudinary)
const upload = multer({ dest: "uploads/" });

// ✅ Routes
router.get("/", getProducts);
router.post("/add", upload.single("image"), addProduct); // <-- must include multer here
router.get("/:id", getProductById);
router.delete("/delete/:id", deleteProductById);

export default router;
