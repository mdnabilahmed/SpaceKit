import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  productName: String,
  color: String,
  price: Number,
  title: String,
  description: String,
  image: String,
  images: [String],
});

const Product = mongoose.model("Product", productSchema);
export default Product;
