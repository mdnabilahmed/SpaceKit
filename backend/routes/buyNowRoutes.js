import express from "express";
import {
  addBuyNowProduct,
  getBuyNowProducts,
} from "../controllers/ButNowController.js";

const router = express.Router();

router.post("/add", addBuyNowProduct);
router.get("/get-selected", getBuyNowProducts);

export default router;
