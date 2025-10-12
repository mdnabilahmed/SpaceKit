import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const base =
      process.env.REACT_APP_API_BASE || "https://api-spacekit.onrender.com";
    const endpoints = [`/api/products/send/${id}`, `/api/products/${id}`];

    (async () => {
      setLoading(true);
      setError(null);
      let found = false;
      for (const ep of endpoints) {
        try {
          const res = await axios.get(`${base}${ep}`, {
            signal: controller.signal,
          });
          if (res && res.data) {
            setProduct(res.data);
            found = true;
            break;
          }
        } catch (err) {
          if (err?.response && err.response.status === 404) {
            continue;
          }
          if (err.name === "CanceledError" || err.message === "canceled") {
            return;
          }
        }
      }
      if (!found) {
        setError("Product not found or server error");
      }
      setLoading(false);
    })();

    return () => controller.abort();
  }, [id]);

  const getImageUrl = (p) => {
    const base =
      process.env.REACT_APP_API_BASE || "https://api-spacekit.onrender.com";
    if (!p) return `${base}/placeholder.png`;
    if (p.image && typeof p.image === "string") {
      if (p.image.startsWith("http")) return p.image;
      if (p.image.startsWith("/uploads")) return `${base}${p.image}`;
    }
    if (Array.isArray(p.images) && p.images.length) {
      const first = p.images[0];
      if (first && typeof first === "string") {
        if (first.startsWith("http")) return first;
        if (first.startsWith("/uploads")) return `${base}${first}`;
      }
    }
    return `${base}/placeholder.png`;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );

  if (error)
    return (
      <div>
        <Navbar />
        <section className="mt-10 mb-10 py-16 px-4 sm:px-5 lg:px-50 pb-0">
          <div className="max-w-4xl mx-auto text-center">
            <Link
              to="/Products"
              className="text-gray-600 hover:text-black inline-flex items-center mb-6 transition-colors"
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

  const imageUrl = getImageUrl(product);

  return (
    <div>
      <Navbar />
      <section className="mt-10 mb-10 py-16 px-4 sm:px-5 lg:px-50 pb-0">
        <Link
          to="/Products"
          className="text-gray-600 hover:text-black inline-flex items-center mb-10 ml-4 transition-colors"
        >
          ← Back to Products
        </Link>

        <div className="max-w-8xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            <div className="space-y-4">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                <img
                  src={imageUrl}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `${
                      process.env.REACT_APP_API_BASE ||
                      "https://api-spacekit.onrender.com"
                    }/placeholder.png`;
                  }}
                />
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">
                {product.productName}
              </h1>

              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                {product.description}
              </p>

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
