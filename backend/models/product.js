import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: { type: String, required: true },
  color: { type: String },
  title: { type: String },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String }, // main image
  images: { type: [String], default: [] }, // optional multiple images
});

const Product = mongoose.model("Product", productSchema);
export default Product;
