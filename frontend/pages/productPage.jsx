import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://api-spacekit.onrender.com/api/products/send/${id}`
        );
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct();
  }, [id]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );

  const imageUrl = product.image?.startsWith("http")
    ? product.image
    : `https://api-spacekit.onrender.com${product.image}`;

  return (
    <div>
      <Navbar />
      <section className="min-h-screen mt-12  bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
        <Link
          to="/Products"
          className="text-gray-600 hover:text-black inline-flex items-center mb-8 ml-4 transition-colors"
        >
          ← Back to Products
        </Link>

        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left side - Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-[4/3] bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right side - Product Info */}
            <div className="flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">
                {product.productName}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Color and Price */}
              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Color
                  </p>
                  <p className="text-lg font-medium">{product.color}</p>
                </div>

                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                    Starts at
                  </p>
                  <p className="text-2xl font-semibold">₹{product.price}</p>
                </div>
              </div>

              {/* Buy Now Button */}
              <button className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-900 transition-colors inline-flex items-center gap-3 w-fit group">
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
