import React, { useState } from "react";
import { motion } from "framer-motion";
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Adventure Backpack Pro",
      price: 129.99,
      quantity: 1,
      image: "/cart-bag1.jpg",
      category: "Bags",
      size: "Medium",
    },
    {
      id: 2,
      name: "Journey Within Book",
      price: 34.99,
      quantity: 2,
      image: "/cart-book1.jpg",
      category: "Books",
      size: "Standard",
    },
    {
      id: 3,
      name: "Morning Brew Ceramic Mug",
      price: 24.99,
      quantity: 1,
      image: "/cart-mug1.jpg",
      category: "Mugs",
      size: "350ml",
    },
  ]);

  const [imageErrors, setImageErrors] = useState({});

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

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 15.0 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Background */}
      <section className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="/bg-img1.jpg"
            alt="Cart Background"
            className="w-full h-full object-cover object-center"
            imageName="bg-cart"
          />
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 h-full flex items-end justify-start px-4 md:px-8 lg:px-12 pb-12 md:pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white font-light leading-tight">
              Your Shopping Cart
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-black py-4">
        <div className="overflow-hidden">
          <motion.div
            className="whitespace-nowrap text-white font-medium text-xs md:text-sm tracking-wide"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          >
            &nbsp;• FREE SHIPPING ON ORDERS OVER $150 • SECURE CHECKOUT • 30-DAY
            RETURNS • FREE SHIPPING ON ORDERS OVER $150 • SECURE CHECKOUT •
            30-DAY RETURNS
          </motion.div>
        </div>
      </section>

      {cartItems.length === 0 ? (
        // Empty Cart State
        <section className="py-20 md:py-32 px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-black mb-6">
              Your Cart is Empty
            </h2>
            <p className="text-lg text-black/60 mb-8 max-w-md mx-auto">
              Discover our curated collection of premium products designed for
              your everyday adventures.
            </p>
            <button className="px-8 py-4 bg-black text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium tracking-wide inline-flex items-center gap-2">
              START SHOPPING <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        </section>
      ) : (
        // Cart Content
        <section className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl md:text-3xl font-light text-black mb-2">
                    ITEMS IN YOUR CART
                  </h2>
                  <p className="text-black/60">
                    {cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"}
                  </p>
                </div>

                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="flex flex-col sm:flex-row gap-4 p-4 md:p-6">
                      {/* Product Image */}
                      <div className="w-full sm:w-32 md:w-40 h-48 sm:h-32 md:h-40 flex-shrink-0">
                        <ImageWithFallback
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded-lg"
                          imageName={`cart-item-${item.id}`}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div>
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
                              onClick={() => removeItem(item.id)}
                              className="text-black/40 hover:text-red-500 transition-colors duration-200 p-2"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3 border border-gray-300 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition-colors duration-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Price */}
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
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-black/70">
                      <span>Shipping</span>
                      <span className="font-medium">
                        ${shipping.toFixed(2)}
                      </span>
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
          </div>
        </section>
      )}

      {/* Bottom CTA Section */}
      {cartItems.length > 0 && (
        <section className="bg-black text-white py-12 md:py-16">
          <div className="px-4 md:px-8 lg:px-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-light mb-4">
              Continue Shopping
            </h3>
            <p className="text-white/70 mb-6">
              Explore more products designed for your everyday adventures
            </p>
            <button className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-100 transition-all duration-300 font-medium tracking-wide inline-flex items-center gap-2">
              BROWSE COLLECTION <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default CartPage;
