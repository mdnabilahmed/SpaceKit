import React from "react";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import Footer from "../components/Footer";

const Products = () => {
  return (
    <>
      <Navbar />
      <div className="mt-25 flex justify-center py-4">
        <div className="overflow-hidden w-full max-w-[40%] pb-10">
          <motion.div
            className="whitespace-nowrap text-black font-medium text-sm sm:text-base"
            animate={{ x: ["100%", "-100%"] }}
            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
          >
            &nbsp;• YOUR GATEWAY TO THE STARS • YOUR GATEWAY TO THE STARS • YOUR
            GATEWAY TO THE STARS
          </motion.div>
        </div>
      </div>
      <div className="pb-10">
        <ProductCard />
      </div>
      <Footer />
    </>
  );
};

export default Products;
