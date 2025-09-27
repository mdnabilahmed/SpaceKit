import express from "express";
import multer from "multer";
import { addProduct, getProduct } from "../controllers/productController.js";

// Configure Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Routes
router.post("/add", upload.single("image"), addProduct);
router.get("/send", getProduct);

export default router;
