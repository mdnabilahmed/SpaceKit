import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState({});

  const API_BASE =
    import.meta.env.VITE_API_BASE || "https://api-spacekit.onrender.com/api";

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

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item._id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item._id !== id));
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
      <section className="relative w-full overflow-hidden">
        <ImageWithFallback
          src="/bg-img1.jpg"
          alt="Cart Background"
          className="w-full object-cover"
          imageName="bg-cart"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-end px-4 md:px-8 pb-8 md:pb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl text-white font-light"
          >
            Your Shopping Cart
          </motion.h1>
        </div>
      </section>

      {/* Marquee */}
      <section className="bg-black py-3">
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
        <section className="py-16 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-light mb-4">
              Your Cart is Empty
            </h2>
            <p className="text-md md:text-lg text-black/60 mb-6 max-w-md mx-auto">
              Discover our curated collection of premium products for your
              everyday adventures.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium inline-flex items-center gap-2"
            >
              START SHOPPING <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </motion.div>
        </section>
      ) : (
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 md:gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4 md:space-y-6">
              {cartItems.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 p-3 md:p-4">
                    <div className="w-full sm:w-28 md:w-36 h-36 sm:h-32 md:h-40 flex-shrink-0">
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
                          <h3 className="text-sm md:text-lg font-normal text-black">
                            {item.name}
                          </h3>
                          <p className="text-xs text-black/60 mt-1">
                            Size: {item.size}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-black/40 hover:text-red-500 p-2 transition-colors"
                        >
                          <Trash2 className="w-4 h-4 md:w-5 md:h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-2 md:mt-4">
                        <div className="flex items-center gap-2 md:gap-3 border border-gray-300 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item._id, -1)}
                            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                          >
                            <Minus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                          <span className="w-6 text-center text-sm md:text-base font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item._id, 1)}
                            className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                          >
                            <Plus className="w-3 h-3 md:w-4 md:h-4" />
                          </button>
                        </div>

                        <div className="text-right text-sm md:text-base">
                          <p className="font-light">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                          <p className="text-xs text-black/50">
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
            <div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="border border-gray-200 rounded-lg p-4 md:p-6 sticky top-4"
              >
                <h2 className="text-lg md:text-2xl font-light text-black mb-4">
                  ORDER SUMMARY
                </h2>

                <div className="space-y-2 mb-4 pb-4 border-b border-gray-200">
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

                <div className="flex justify-between text-base md:text-lg font-normal text-black mb-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium flex items-center justify-center gap-2 active:scale-95">
                  PROCEED TO CHECKOUT{" "}
                  <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
                </button>

                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs md:text-sm text-black/60 text-center">
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
