import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  // Vite-compatible API base
  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000/api";

  // Handle image fallback
  const handleImageError = (imageName) => {
    setImageErrors((prev) => ({ ...prev, [imageName]: true }));
  };

  const ImageWithFallback = ({ src, alt, className, imageName, ...props }) => (
    <img
      src={imageErrors[imageName] ? "/placeholder.jpg" : src}
      alt={alt}
      className={className}
      onError={() => handleImageError(imageName)}
      loading="lazy"
      {...props}
    />
  );

  // Fetch selected products from backend
  const fetchSelectedProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/buynow/get-selected`);
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart products:", err);
      setError("Failed to fetch cart products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSelectedProducts();
  }, []);

  const updateQuantity = async (id, delta) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
    // Optional: update backend quantity here
  };

  const removeItem = async (id) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
    // Optional: remove item from backend
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 15.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
      </div>
    );

  if (error)
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-semibold mb-4">{error}</h2>
        <p>Please try refreshing the page.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <ImageWithFallback
          src="/bg-img1.jpg"
          alt="Cart Background"
          className="w-full h-full object-cover"
          imageName="bg-cart"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end px-8 pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl text-white font-light"
          >
            Your Shopping Cart
          </motion.h1>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-black py-4">
        <motion.div
          className="whitespace-nowrap text-white font-medium text-xs md:text-sm tracking-wide overflow-hidden"
          animate={{ x: ["100%", "-100%"] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          &nbsp;• FREE SHIPPING ON ORDERS OVER $150 • SECURE CHECKOUT • 30-DAY
          RETURNS • FREE SHIPPING ON ORDERS OVER $150 • SECURE CHECKOUT • 30-DAY
          RETURNS
        </motion.div>
      </section>

      {cartItems.length === 0 ? (
        <section className="py-20 md:py-32 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-light mb-6">
              Your Cart is Empty
            </h2>
            <p className="text-lg text-black/60 mb-8 max-w-md mx-auto">
              Discover our curated collection of premium products for your
              everyday adventures.
            </p>
            <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium tracking-wide inline-flex items-center gap-2">
              START SHOPPING <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </section>
      ) : (
        <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                    <div className="w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 flex-shrink-0">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover rounded-lg"
                        imageName={`cart-item-${item._id}`}
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs uppercase tracking-wider text-black/50 mb-1">
                            {item.category}
                          </p>
                          <h3 className="text-lg md:text-xl font-normal text-black">
                            {item.name}
                          </h3>
                          <p className="text-sm text-black/60 mt-1">
                            Size: {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-black/40 hover:text-red-500 transition-colors duration-200 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xl md:text-2xl font-light text-black">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-sm text-black/50">
                            ${item.price.toFixed(2)} each
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="border border-gray-200 rounded-lg p-6 md:p-8 sticky top-6"
              >
                <h2 className="text-2xl font-light text-black mb-6">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-black/70">
                    <span>Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-black/70">
                    <span>Shipping</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-black/70">
                    <span>Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex justify-between text-xl md:text-2xl font-normal text-black mb-8">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium tracking-wide flex items-center justify-center gap-2 active:scale-95">
                  PROCEED TO CHECKOUT <ArrowRight className="w-5 h-5" />
                </button>

                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-black/60 text-center">
                    Free shipping on orders over $150
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default CartPage;
