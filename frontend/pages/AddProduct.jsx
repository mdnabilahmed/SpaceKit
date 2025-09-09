import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please upload an image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("color", color);
      formData.append("price", price);
      formData.append("image", imageFile);

      await axios.post(
        "https://api-spacekit.onrender.com/api/products/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("✅ Product saved successfully!");

      // Reset fields
      setProductName("");
      setColor("");
      setPrice("");
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      console.error(error);
      alert("❌ Something went wrong while saving the product");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
          {/* Image Upload Section */}
          <div className="border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 relative bg-gray-50 hover:border-blue-400 transition">
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Upload Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="absolute opacity-0 w-full h-full cursor-pointer"
            />
            {preview ? (
              <img
                src={preview}
                alt="preview"
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                <p className="text-sm">Click or Drag & Drop to upload</p>
              </div>
            )}
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col gap-6">
            <input
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              type="text"
              placeholder="Product Name"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg text-gray-700"
              required
            />
            <input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              type="text"
              placeholder="Color"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg text-gray-700"
              required
            />
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              placeholder="Price"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg text-gray-700"
              required
            />
            <button
              type="submit"
              className="cursor-pointer active:scale-95 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Submit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
