import BuyNowProduct from "../models/BuyNowProduct.js";

const addBuyNowProduct = async (req, res) => {
    try {
        const { name, price, image } = req.body;

        if (!name || !price || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingProduct = await BuyNowProduct.findOne({ name });

        if (existingProduct) {
            existingProduct.quantity += 1;
            await existingProduct.save();
            return res
                .status(200)
                .json({ message: "Quantity updated", product: existingProduct });
        }

        const newProduct = new BuyNowProduct({ name, price, image, quantity: 1 });
        await newProduct.save();

        res
            .status(201)
            .json({ message: "Product added successfully", product: newProduct });
    } catch (error) {
        console.error("Error saving Buy Now product:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const getBuyNowProducts = async (req, res) => {
    try {
        const products = await BuyNowProduct.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching Buy Now products:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export { addBuyNowProduct, getBuyNowProducts };
