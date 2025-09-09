import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  color: { type: String },
  price: { type: Number, required: true },
  image: { type: String },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
