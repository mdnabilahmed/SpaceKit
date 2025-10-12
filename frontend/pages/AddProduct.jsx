import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProduct = () => {
  const [preview, setPreview] = useState(null);
  const [productName, setProductName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmingId, setConfirmingId] = useState(null);
  const [adding, setAdding] = useState(false);

  const navigate = useNavigate();

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
      toast.error("Please upload an image");
      return;
    }

    setAdding(true);
    try {
      const formData = new FormData();
      formData.append("productName", productName);
      formData.append("color", color);
      formData.append("price", price);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("image", imageFile);

      await axios.post(
        "https://api-spacekit.onrender.com/api/products/add",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      await fetchProducts();
      toast.success("✅ Product saved successfully!");
      setProductName("");
      setColor("");
      setPrice("");
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPreview(null);
    } catch (error) {
      console.error("Error uploading product:", error.response || error);
      toast.error(
        `❌ Error: ${
          error.response?.data?.message ||
          "Something went wrong while saving the product"
        }`
      );
    } finally {
      setAdding(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "https://api-spacekit.onrender.com/api/products"
      );
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    setConfirmingId(null);
    try {
      await axios.delete(
        `https://api-spacekit.onrender.com/api/products/delete/${id}`
      );
      toast.success("🗑️ Product deleted successfully!");
      await fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("❌ Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 relative">
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 px-4 py-2 border border-gray-800 text-gray-800 rounded-lg hover:bg-gray-800 hover:text-white transition"
      >
        ← Back
      </button>

      <div className="rounded-2xl shadow-xl w-full max-w-5xl p-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-10">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-10"
        >
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              placeholder="Title"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg text-gray-700"
              required
            />
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className="border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 p-3 rounded-lg text-gray-700 h-24 resize-none"
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
              disabled={adding}
              className="cursor-pointer active:scale-95 bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition shadow-md disabled:opacity-70 flex justify-center items-center gap-2"
            >
              {adding ? (
                <>
                  <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  Adding...
                </>
              ) : (
                "Submit Product"
              )}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="mt-20 w-full max-w-6xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          All Products
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => (
            <div
              key={p._id}
              className="relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <img
                  src={
                    p.image?.startsWith("http")
                      ? p.image
                      : `https://api-spacekit.onrender.com${p.image}`
                  }
                  alt={p.productName}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    deletingId === p._id ? "opacity-40" : ""
                  }`}
                />
                {deletingId === p._id && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                    <div className="w-10 h-10 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              <div className="p-4 flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.productName}
                  </h3>
                  <p className="text-gray-500">{p.color}</p>
                  <p className="text-gray-700 font-medium">${p.price}</p>
                </div>

                {confirmingId === p._id ? (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setConfirmingId(null)}
                      className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-3 py-1 rounded-md text-sm"
                    >
                      No
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmingId(p._id)}
                    disabled={deletingId === p._id}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition disabled:opacity-70"
                  >
                    {deletingId === p._id ? "Deleting..." : "Delete"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
