import Product from "../models/product.js";

// Add a product
const addProduct = async (req, res) => {
  try {
    const { productName, color, price, title, description, images } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newProduct = new Product({
      productName,
      color,
      title,
      description,
      price,
      image: imagePath,
      images: images || [], // optional array of images
    });

    await newProduct.save();
    res.json({ message: "✅ Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Get all products
const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// Get single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Error fetching product" });
  }
};

export { addProduct, getProduct, getProductById };
