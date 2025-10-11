import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";
import mongoose from "mongoose";

const addProduct = async (req, res) => {
  try {
    const { productName, color, price, title, description } = req.body;

    // ✅ Ensure file was received by multer
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // ✅ Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "spacekit_products",
    });

    // ✅ Remove temp file from server
    fs.unlinkSync(req.file.path);

    // ✅ Save product in MongoDB
    const newProduct = new Product({
      productName,
      color,
      price,
      title,
      description,
      image: uploadResult.secure_url,
      images: [uploadResult.secure_url],
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({
      message: "Server error while adding product",
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      message: "Server error while getting all products",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({
      message: "Server error while getting product by ID",
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export { addProduct, getProducts, getProductById, deleteProductById };
