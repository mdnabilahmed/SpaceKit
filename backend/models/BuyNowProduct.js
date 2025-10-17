import mongoose from "mongoose";

const buyNowSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, default: 1 }, 
});

const BuyNowProduct = mongoose.model("BuyNowProduct", buyNowSchema);

export default BuyNowProduct;
