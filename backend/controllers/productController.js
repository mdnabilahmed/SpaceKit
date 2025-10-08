import Product from "../models/product.js";
import cloudinary from "../config/cloudinary.js";
import fs from "fs";

// ✅ Add Product
const addProduct = async (req, res) => {
  try {
    const { productName, color, price, title, description } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "spacekit_products",
    });

    // Delete local file after upload
    fs.unlinkSync(req.file.path);

    const newProduct = new Product({
      productName,
      color,
      price,
      title,
      description,
      image: uploadResult.secure_url,
      images: [uploadResult.secure_url], // ✅ Always provide an array
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Separate exports
export { addProduct, getProducts, getProductById };
