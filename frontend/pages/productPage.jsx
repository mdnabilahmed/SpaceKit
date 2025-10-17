import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "https://api-spacekit.onrender.com/api/products";

  // Fetch product by ID
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await axios.get(`${API_BASE}/${id}`);
        setProduct(response.data);
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Product not found or server error");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div>
        <Navbar />
        <section className="mt-10 py-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/Products"
              className="text-gray-600 hover:text-black inline-flex items-center mb-6"
            >
              ← Back to Products
            </Link>
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h2 className="text-2xl font-semibold mb-4">Error</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <Link
                to="/Products"
                className="inline-block bg-black text-white px-6 py-3 rounded-full"
              >
                Back to Products
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );

  const imageUrl =
    product?.image ||
    (Array.isArray(product?.images) && product.images[0]) ||
    "/placeholder.png";

  // Handle Buy Now button click
  const handleBuyNow = async () => {
    try {
      await axios.post("http://localhost:3000/api/buynow/add", {
        name: product?.productName || product?.name,
        price: product?.price,
        image: imageUrl,
      });

      toast.success("🛒 Product added successfully!", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        pauseOnHover: false,
        draggable: true,
      });

      navigate("/cartpage"); // Redirect to cart page
    } catch (err) {
      console.error("Error adding product:", err);
      toast.error("❌ Failed to add product. Please try again.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <section className="mt-10 mb-10 py-16 px-4">
        <Link
          to="/Products"
          className="text-gray-600 hover:text-black inline-flex items-center mb-10 ml-4"
        >
          ← Back to Products
        </Link>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={imageUrl}
                  alt={product?.productName || product?.name || "product"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/placeholder.png";
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center m-5">
              <h1 className="text-4xl font-light mb-6">
                {product?.productName || product?.name || "Product"}
              </h1>

              <p className="text-lg text-gray-600 mb-8">
                {product?.description || "No description available."}
              </p>

              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-1">Color</p>
                  <p className="text-lg font-medium">{product?.color || "-"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase mb-1">Price</p>
                  <p className="text-2xl font-semibold">
                    ${product?.price || 0}
                  </p>
                </div>
              </div>

              <button
                onClick={handleBuyNow}
                className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-900 transition-colors inline-flex items-center gap-3 w-fit group"
              >
                BUY NOW
                <span className="group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ProductPage;
