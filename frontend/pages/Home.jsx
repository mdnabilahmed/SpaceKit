// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [imageErrors, setImageErrors] = useState({});
  const navigate = useNavigate();

  // Handle image loading errors
  const handleImageError = (imageName) => {
    setImageErrors((prev) => ({ ...prev, [imageName]: true }));
  };

  // Enhanced Fallback image component with better responsive handling
  const ImageWithFallback = ({
    src,
    alt,
    className,
    fallbackSrc = "/placeholder.jpg",
    imageName,
    ...props
  }) => (
    <img
      src={imageErrors[imageName] ? fallbackSrc : src}
      alt={alt}
      className={`${className} transition-all duration-300 ease-out`}
      onError={() => handleImageError(imageName)}
      loading="lazy"
      {...props}
    />
  );

  return (
    <div className="min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ImageWithFallback
          src="/bg-img1.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center"
          imageName="bg-img1"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 flex items-end justify-start h-screen px-4 md:px-8 lg:px-12 pb-20 md:pb-5 lg:pb-12">
        <div className="max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-black font-light leading-tight">
            Your Next Adventure <br />
            Starts With Us
          </h1>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center md:py-16 lg:py-20">
          {/* Responsive marquee */}
          <div className="overflow-hidden w-full max-w-[90%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%]">
            <motion.div
              className="whitespace-nowrap text-black font-medium text-xs md:text-base"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              &nbsp;• DESIGNED FOR YOUR EVERYDAY ADVENTURES • DESIGNED FOR YOUR
              EVERYDAY ADVENTURES • DESIGNED FOR YOUR EVERYDAY ADVENTURES
            </motion.div>
          </div>

          <div className="text-center px-4 md:px-8">
            <h2 className="pt-6 md:pt-10 lg:pt-12 text-xl md:text-3xl lg:text-4xl xl:text-5xl text-black font-normal leading-tight">
              Explore our curated collection <br className="hidden md:block" />
              of high-quality products
            </h2>

            <p className="pt-4 md:pt-8 lg:pt-10 text-sm md:text-base lg:text-lg xl:text-xl text-black/80 leading-relaxed max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto">
              Whether you're looking for a stylish new bag, a captivating book,
              or a perfect mug for your morning brew, we've got you covered.
            </p>
          </div>

          <div className="w-full px-3 md:px-6 lg:px-8 pt-8 md:pt-12 lg:pt-16 xl:pt-20">
            {/* Row 1 */}
            <div className="h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-5 lg:gap-5 mb-3 md:mb-5 lg:mb-6">
              {/* Bag Image (smaller) */}
              <div className="w-full h-full lg:col-span-4">
                <div className="h-full overflow-hidden border border-gray-200 rounded-lg md:rounded-xl shadow-sm">
                  <ImageWithFallback
                    src="/home-bag1.jpg"
                    alt="Premium Travel Bag"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                    imageName="home-bag1"
                  />
                </div>
              </div>

              {/* Cups Image with Text Overlay (larger) */}
              <div className="w-full h-full lg:col-span-8">
                <div className="group relative h-full overflow-hidden rounded-lg md:rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-cups1.jpg"
                    alt="Premium Cup Collection"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-cups1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent md:bg-transparent"></div>
                  <div className="absolute inset-0 flex items-start p-3 md:p-6 lg:p-8 xl:p-12">
                    <h3 className="w-full max-w-[700px] text-base md:text-lg lg:text-2xl xl:text-3xl font-normal text-white drop-shadow-lg">
                      Lightweight, durable, and perfect for{" "}
                      <br className="hidden md:block" />
                      any journey with our premium kits
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 md:gap-5 lg:gap-6">
              {/* Book Image (wider) */}
              <div className="w-full order-2 md:order-1 lg:col-span-8">
                <div className="group relative h-full overflow-hidden rounded-lg md:rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-book1.jpg"
                    alt="Mindful Living Book"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-book1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent md:bg-transparent"></div>
                  <div className="absolute inset-0 flex items-start p-3 md:p-6 lg:p-8 xl:p-12">
                    <h3 className="w-full max-w-[700px] text-base md:text-lg lg:text-2xl xl:text-3xl font-normal text-white drop-shadow-lg">
                      Tools to stay organized <br className="hidden md:block" />
                      and on top of your goals{" "}
                      <br className="hidden md:block" />
                      every day.
                    </h3>
                  </div>
                </div>
              </div>

              {/* Backpack Image with LEARN MORE button (narrower) */}
              <div className="w-full order-2 md:order-1 lg:col-span-4">
                <div className="group relative h-full overflow-hidden rounded-lg md:rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-bag2.jpg"
                    alt="Adventure Backpack"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-bag2"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      onClick={() => navigate("/products")}
                      className="flex items-center gap-2 bg-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black/20 text-sm md:text-base font-medium text-black cursor-pointer active:scale-95"
                    >
                      LEARN MORE <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Image + Scrollable Content */}
      <section className="relative flex flex-col lg:flex-row w-full">
        {/* Left Sticky Image */}
        <div className="w-full lg:w-1/2 lg:sticky lg:top-0 lg:h-screen lg:order-first m-1">
          <div className="h-[40vh] md:h-[60vh] lg:h-full">
            <ImageWithFallback
              src="/home-background1.jpg"
              alt="Adventure Background"
              className="w-full h-full object-cover object-center"
              imageName="home-background1"
            />
          </div>
        </div>

        {/* Right Scrollable Content */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          {/* Hero Bag Image - Top aligned */}
          <section className="flex items-center justify-center px-0 pt-0 pb-8 m-1">
            <div className="w-full">
              <ImageWithFallback
                src="/home-herobag1.jpg"
                alt="Hero Adventure Bag"
                className="w-full h-auto rounded-none shadow-sm object-cover"
                imageName="home-herobag1"
              />
            </div>
          </section>

          {/* Mindful Living Section */}
          <section className="flex items-center px-6 py-6">
            <div className="w-full">
              <p className="tracking-[0.2em] text-black/60 mb-4 text-base uppercase font-light">
                IDEAL FOR QUIET EVENINGS
              </p>

              <h2 className="text-5xl font-light leading-[1.1] mb-6 text-black">
                Mindful Living <br /> in Every Page
              </h2>

              <div className="space-y-3 mb-8 max-w-xl">
                <p className="text-lg leading-relaxed text-black/70">
                  Whether you're looking to reflect on your past, gain clarity
                  on your goals, or simply find a few moments of calm, this
                  beautifully designed guide will inspire and motivate.
                </p>
                <p className="text-lg leading-relaxed text-black/70">
                  Let Journey Within be the companion that helps you navigate
                  life's ups and downs with grace and mindfulness.
                </p>
              </div>

              {/* Small book image - bigger */}
              <div className="flex justify-end">
                <div className="w-32 h-32 rounded-lg overflow-hidden shadow-md">
                  <ImageWithFallback
                    src="/home-book2.jpg"
                    alt="Journey Within Book"
                    className="w-full h-full object-cover object-center"
                    imageName="home-book2"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Bag Image Section - Bottom right */}
          <section className="flex justify-end px-6 py-8">
            <div className="w-full max-w-md">
              <ImageWithFallback
                src="/home-herobag2.jpg"
                alt="Premium Travel Bag"
                className="w-full h-[70vh] object-cover object-center shadow-lg"
                imageName="home-herobag2"
              />
            </div>
          </section>

          {/* Mug Section - Left aligned */}
          <section className="flex items-center px-6 py-6">
            <div className="w-full">
              <p className="font-normal mb-2 text-base uppercase tracking-[0.2em] text-black/60">
                QUALITY, SIMPLICITY, AND COMFORT
              </p>

              <h2 className="text-5xl font-light mb-6 text-black leading-[1.1]">
                Simplicity Meets <br /> Sophistication
              </h2>

              <div className="space-y-3 mb-8 max-w-xl">
                <p className="text-lg leading-relaxed text-black/70">
                  Designed for those who appreciate the finer things in life,
                  this mug combines functionality with sleek, modern design. Its
                  smooth ceramic surface is easy to clean and resistant to
                  stains, while the comfortable handle ensures a perfect grip
                  every time.
                </p>
                <p className="text-lg leading-relaxed text-black/70">
                  Whether you're enjoying a quiet morning at home or a quick
                  break at the office, the Morning Brew Mug adds a touch of
                  sophistication to your daily routine.
                </p>
              </div>

              {/* Cup Image - bigger */}
              <div className="flex justify-start">
                <div className="w-44 h-44 rounded-full overflow-hidden shadow-lg">
                  <ImageWithFallback
                    src="/home-cups2.jpg"
                    alt="Morning Brew Mug"
                    className="w-full h-full object-contain"
                    imageName="home-cups2"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-white py-10 md:py-16 lg:py-20 xl:py-24 w-full">
        <div className="px-4 md:px-8 lg:px-12 xl:px-20 mx-auto w-full">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 md:mb-12 lg:mb-16 gap-4 md:gap-6">
            <div>
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-medium text-black mb-2">
                × OUR PRODUCTS
              </h2>
              <p className="text-gray-500 text-sm md:text-base">
                All collection
              </p>
            </div>

            <button
              onClick={() => navigate("/products")}
              className="w-full md:w-auto px-6 md:px-8 py-3 md:py-4 rounded-lg bg-black text-white text-sm md:text-base font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-95 cursor-pointer"
            >
              SHOP NOW
            </button>
          </div>

          {/* Product Cards */}
          <div className="w-full">
            <ProductCard />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
