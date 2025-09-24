// src/components/Navbar.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiOutlineMenuAlt3, HiOutlineX } from "react-icons/hi";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 10) {
      setShowNavbar(false); // scrolling down
    } else {
      setShowNavbar(true); // scrolling up
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navigate = useNavigate();

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: showNavbar ? 0 : -100, opacity: showNavbar ? 1 : 0 }}
      transition={{ duration: 0.4, ease: "easeInOut", delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-50 p-5 max-w-full"
    >
      <div className="p-5 mx-4 sm:mx-8 flex justify-between items-center bg-white/20 rounded-3xl backdrop-blur-lg">
        {/* Logo */}
        <button
          onClick={() => navigate("/")}
          className="cursor-pointer flex items-center"
        >
          <img
            className="w-auto" // fixed consistent size
            src="https://cdn.prod.website-files.com/66ec6afe3cc26899cbbb300a/66face70e9cfc8ce74be2c83_Logo%20Spacekit.svg"
            alt="spacekit logo"
          />
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-7 justify-center items-center text-black">
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/faq">FAQ</a>
          </li>
          <li className="bg-white text-black text-[15px] px-4 py-1 rounded">
            <Link to="/contactus">
              <button className=" cursor-pointer">Contact Us</button>
            </Link>
          </li>
          <li className="bg-blue-400 text-white text-[15px] px-6 py-1 rounded">
            <Link to="/login">
              <button className=" cursor-pointer">Login</button>
            </Link>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          {menuOpen ? (
            <HiOutlineX
              size={28}
              onClick={() => setMenuOpen(false)}
              className="cursor-pointer text-black"
            />
          ) : (
            <HiOutlineMenuAlt3
              size={28}
              onClick={() => setMenuOpen(true)}
              className="cursor-pointer text-black"
            />
          )}
        </div>
      </div>

      {/* Mobile Menu Popout */}
      {menuOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 w-3/4 h-full bg-white shadow-lg z-40 flex flex-col items-start p-6 space-y-6 md:hidden"
        >
          <HiOutlineX
            size={28}
            onClick={() => setMenuOpen(false)}
            className="cursor-pointer self-end mb-4"
          />
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#products" onClick={() => setMenuOpen(false)}>
            Products
          </a>
          <a href="#faq" onClick={() => setMenuOpen(false)}>
            FAQ
          </a>
          <button
            onClick={() => setMenuOpen(false)}
            className="bg-black text-white px-5 py-2 rounded"
          >
            Contact Us
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
