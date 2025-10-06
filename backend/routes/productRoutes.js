import express from "express";
import multer from "multer";
import {
  addProduct,
  getProduct,
  getProductById,
} from "../controllers/productController.js";

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/add", upload.single("image"), addProduct);
router.get("/send", getProduct);
router.get("/send/:id", getProductById);

export default router;
