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
      {/* Background Image - Enhanced responsive handling */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ImageWithFallback
          src="/bg-img1.jpg"
          alt="Background"
          className="w-full h-full object-cover object-center"
          imageName="bg-img1"
        />
      </div>

      <Navbar />

      {/* Hero Section - Improved responsive text */}
      <section className="relative z-10 flex items-end justify-start h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-15 pb-6 sm:pb-8 md:pb-10 lg:pb-12">
        <div className="max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-[77px] text-black font-light leading-tight">
            Your Next Adventure <br />
            Starts With Us
          </h1>
        </div>
      </section>

      {/* Marquee Section - Enhanced responsive layout */}
      <section className="bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 lg:py-20">
          {/* Responsive marquee */}
          <div className="overflow-hidden w-full max-w-[90%] sm:max-w-[70%] md:max-w-[60%] lg:max-w-[50%] xl:max-w-[40%]">
            <motion.div
              className="whitespace-nowrap text-black font-medium text-xs sm:text-sm md:text-base"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              &nbsp;• DESIGNED FOR YOUR EVERYDAY ADVENTURES • DESIGNED FOR YOUR
              EVERYDAY ADVENTURES • DESIGNED FOR YOUR EVERYDAY ADVENTURES
            </motion.div>
          </div>

          <div className="text-center px-4 sm:px-6 md:px-8">
            <h2 className="pt-6 sm:pt-8 md:pt-10 lg:pt-12 text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-[70px] text-black font-normal leading-tight">
              Explore our curated collection <br className="hidden sm:block" />
              of high-quality products
            </h2>

            <p className="pt-4 sm:pt-6 md:pt-8 lg:pt-10 text-sm sm:text-base lg:text-lg xl:text-xl text-black/80 leading-relaxed max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto">
              Whether you're looking for a stylish new bag, a captivating book,
              or a perfect mug for your morning brew, we've got you covered.
            </p>
          </div>

          {/* Product Image Grid - Enhanced responsive grid */}
          <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pt-8 sm:pt-10 md:pt-12 lg:pt-16 xl:pt-20">
            {/* Row 1 - Improved responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 lg:gap-6 mb-3 sm:mb-4 md:mb-5 lg:mb-6">
              <div className="md:col-span-1 lg:col-span-5">
                <div className="aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/5] lg:aspect-[4/6] overflow-hidden border border-gray-200 rounded-lg sm:rounded-xl shadow-sm">
                  <ImageWithFallback
                    src="/home-bag1.jpg"
                    alt="Premium Travel Bag"
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700 ease-out"
                    imageName="home-bag1"
                  />
                </div>
              </div>

              <div className="md:col-span-1 lg:col-span-7">
                <div className="group relative aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] lg:aspect-[7/6] overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-cups1.jpg"
                    alt="Premium Cup Collection"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-cups1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-start p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal text-white drop-shadow-lg">
                      Lightweight, durable, and perfect for{" "}
                      <br className="hidden sm:block" />
                      any journey with our premium kits
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 - Enhanced responsive grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
              <div className="md:col-span-1 lg:col-span-7 order-2 md:order-1">
                <div className="group relative aspect-[4/3] sm:aspect-[4/3] md:aspect-[4/3] lg:aspect-[7/6] overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-book1.jpg"
                    alt="Mindful Living Book"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-book1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                  <div className="absolute inset-0 flex items-start p-3 sm:p-4 md:p-6 lg:p-8 xl:p-12">
                    <h3 className="text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl 2xl:text-4xl font-normal text-white drop-shadow-lg">
                      Tools to stay organized <br className="hidden sm:block" />
                      and on top of your goals{" "}
                      <br className="hidden sm:block" />
                      every day.
                    </h3>
                  </div>
                </div>
              </div>

              <div className="md:col-span-1 lg:col-span-5 order-1 md:order-2">
                <div className="group relative aspect-[4/5] sm:aspect-[4/5] md:aspect-[4/5] lg:aspect-[4/6] overflow-hidden rounded-lg sm:rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-bag2.jpg"
                    alt="Adventure Backpack"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-bag2"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="flex items-center gap-2 sm:gap-3 bg-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black/20">
                      <button
                        onClick={() => navigate("/products")}
                        className="text-xs sm:text-sm font-medium tracking-wide text-black cursor-pointer active:scale-90"
                      >
                        LEARN MORE
                      </button>
                      <span className="text-sm sm:text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Image + Scrollable Content - Enhanced responsive layout */}
      <section className="flex flex-col lg:flex-row w-full">
        {/* Left Sticky Image - Improved responsive heights */}
        <div className="w-full lg:w-1/2 relative">
          <div className="lg:sticky lg:top-0 h-[40vh] sm:h-[50vh] md:h-[60vh] lg:h-screen">
            <ImageWithFallback
              src="/home-background1.jpg"
              alt="Adventure Background"
              className="w-full h-full object-cover object-center"
              imageName="home-background1"
            />
          </div>
        </div>

        {/* Right Content - Enhanced responsive spacing */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          {/* Hero Bag Image - Improved responsive sizing */}
          <section className="flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8 md:py-10 lg:py-12">
            <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full">
              <ImageWithFallback
                src="/home-herobag1.jpg"
                alt="Hero Adventure Bag"
                className="w-full h-auto rounded-lg shadow-sm object-cover"
                imageName="home-herobag1"
              />
            </div>
          </section>

          {/* Mindful Living Section - Enhanced responsive typography */}
          <section className="min-h-[70vh] sm:min-h-[80vh] lg:min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
            <p className="tracking-widest text-black/70 mb-6 sm:mb-8 lg:mb-12 text-xs sm:text-sm uppercase">
              IDEAL FOR QUIET EVENINGS
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl font-light leading-tight mb-6 sm:mb-8 lg:mb-12 text-black">
              Mindful Living <br /> in Every Page
            </h2>

            <div className="space-y-4 sm:space-y-6 lg:space-y-8 mb-6 sm:mb-8 lg:mb-12">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-black/80">
                Whether you're looking to reflect on your past, gain clarity on
                your goals, or simply find a few moments of calm in your busy
                day, this beautifully designed guide will inspire and motivate.
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-black/80">
                Let Journey Within be the companion that helps you navigate
                life's ups and downs with grace and mindfulness.
              </p>
            </div>

            <div className="flex justify-center sm:justify-end">
              <div className="w-30 h-30 sm:w-24 sm:h-24 rounded-lg overflow-hidden shadow-md">
                <ImageWithFallback
                  src="/home-book2.jpg"
                  alt="Journey Within Book"
                  className="w-full h-full object-cover object-center"
                  imageName="home-book2"
                />
              </div>
            </div>
          </section>

          {/* Bag Image Section - Enhanced responsive sizing */}
          <section className="flex items-center justify-center lg:justify-end min-h-[2vh] sm:min-h-[2vh] lg:min-h-[4vh] px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16">
            <div className="py-2 sm:py-3 md:py-4 lg:py-6 xl:py-8">
              <ImageWithFallback
                src="/home-herobag2.jpg"
                alt="Premium Travel Bag"
                className="h-42 w-42 sm:h-40 sm:w-58 md:h-48 md:w-64 lg:h-64 lg:w-80 xl:h-80 xl:w-96 2xl:h-[500px] 2xl:w-[560px] object-cover object-center rounded-lg shadow-lg"
                imageName="home-herobag2"
              />
            </div>
          </section>

          {/* Mug Section - Enhanced responsive layout */}
          <section className="min-h-[50vh] sm:min-h-[60vh] lg:min-h-[80vh] flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 sm:py-6 md:py-8 lg:py-12 xl:py-16">
            <p className="font-medium mb-3 sm:mb-4 lg:mb-6 text-xs sm:text-sm tracking-widest uppercase text-black/70">
              QUALITY, SIMPLICITY, AND COMFORT
            </p>

            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-light mb-4 sm:mb-6 lg:mb-8 text-black leading-tight">
              Simplicity Meets <br /> Sophistication
            </h2>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6 mb-4 sm:mb-6 lg:mb-8 max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl">
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-black/80">
                Designed for those who appreciate the finer things in life, this
                mug combines functionality with sleek, modern design. Its smooth
                ceramic surface is easy to clean and resistant to stains, while
                the comfortable handle ensures a perfect grip every time.
              </p>

              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-black/80">
                Whether you're enjoying a quiet morning at home or a quick break
                at the office, the Morning Brew Mug adds a touch of
                sophistication to your daily routine.
              </p>
            </div>

            {/* Cup Image - Improved responsive sizing */}
            <div className="flex justify-center lg:justify-start lg:ml-8 xl:ml-16 2xl:ml-24">
              <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-full overflow-hidden shadow-lg">
                <ImageWithFallback
                  src="/home-cups2.jpg"
                  alt="Morning Brew Mug"
                  className="w-full h-full object-contain"
                  imageName="home-cups2"
                />
              </div>
            </div>
          </section>
        </div>
      </section>

      {/* Products Section - Enhanced responsive spacing */}
      <section className="bg-white py-12 sm:py-16 lg:py-20 xl:py-24">
        <div className="px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 gap-4 sm:gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium text-black mb-2">
                × OUR PRODUCTS
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                All collection
              </p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-lg bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-95 cursor-pointer"
            >
              SHOP NOW
            </button>
          </div>

          <div>
            <ProductCard />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
