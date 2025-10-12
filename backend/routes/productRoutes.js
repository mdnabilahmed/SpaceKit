import express from "express";
import multer from "multer";
import {
  addProduct,
  getProducts,
  getProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.get("/", getProducts);
router.post("/add", upload.single("image"), addProduct);
router.get("/:id", getProductById);
router.delete("/delete/:id", deleteProductById);

export default router;
