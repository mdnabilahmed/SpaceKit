import Product from "../models/product.js";

const addProduct = async (req, res) => {
  try {
    const { productName, color, price } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const imagePath = `/uploads/${req.file.filename}`;

    const newProduct = new Product({
      productName,
      color,
      price,
      image: imagePath,
    });

    await newProduct.save();
    res.json({ message: "✅ Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

export { addProduct, getProduct };
