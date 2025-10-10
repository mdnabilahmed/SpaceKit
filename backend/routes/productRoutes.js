import express from "express";
import {
  addProduct,
  getProducts,
  getProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/send", getProducts);
router.get("/send/:id", getProductById);
router.delete("/delete/:id", deleteProductById);

export default router;
