// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";
import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import Footer from "../components/Footer";

const Home = () => {
  const [imageErrors, setImageErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // Handle image loading errors
  const handleImageError = (imageName) => {
    setImageErrors((prev) => ({ ...prev, [imageName]: true }));
  };

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Fallback image component
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
      className={className}
      onError={() => handleImageError(imageName)}
      loading="lazy"
      {...props}
    />
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full z-0">
        <ImageWithFallback
          src="/bg-img1.jpg"
          alt="Background"
          className="w-full h-full object-cover"
          imageName="bg-img1"
        />
      </div>

      <Navbar />

      {/* Hero Section */}
      <section className="relative z-10 flex items-end justify-start h-screen px-4 sm:px-8 lg:px-15 pb-8 sm:pb-12">
        <div className="max-w-4xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-[77px] text-black font-light leading-tight">
            Your Next Adventure <br />
            Starts With Us
          </h1>
        </div>
      </section>

      {/* Marquee Section */}
      <section className="bg-white/90 backdrop-blur-sm">
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
          <div className="overflow-hidden w-full max-w-[90%]">
            <motion.div
              className="whitespace-nowrap text-black font-medium text-sm sm:text-base"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
            >
              &nbsp;• DESIGNED FOR YOUR EVERYDAY ADVENTURES • DESIGNED FOR YOUR
              EVERYDAY ADVENTURES • DESIGNED FOR YOUR EVERYDAY ADVENTURES
            </motion.div>
          </div>

          <div className="text-center px-4 sm:px-8">
            <h2 className="pt-8 sm:pt-12 text-2xl sm:text-4xl lg:text-5xl xl:text-[70px] text-black font-normal leading-tight">
              Explore our curated collection <br className="hidden sm:block" />
              of high-quality products
            </h2>

            <p className="pt-6 sm:pt-10 text-sm sm:text-base lg:text-lg text-black/80 leading-relaxed max-w-2xl mx-auto">
              Whether you're looking for a stylish new bag, a captivating book,
              or a perfect mug for your morning brew, we've got you covered.
            </p>
          </div>

          {/* Product Image Grid */}
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-12 lg:pt-20">
            {/* Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 mb-4 sm:mb-6">
              <div className="lg:col-span-5">
                <div className="aspect-[4/5] lg:aspect-[4/6] overflow-hidden border border-gray-200 rounded-xl shadow-sm">
                  <ImageWithFallback
                    src="/home-bag1.jpg"
                    alt="Premium Travel Bag"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                    imageName="home-bag1"
                  />
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="group relative aspect-[4/3] lg:aspect-[7/6] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-cups1.jpg"
                    alt="Premium Cup Collection"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-cups1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
                  <div className="absolute inset-0 flex items-start p-4 sm:p-8 lg:p-12">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-white drop-shadow-lg">
                      Lightweight, durable, and perfect for{" "}
                      <br className="hidden sm:block" />
                      any journey with our premium kits
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
              <div className="lg:col-span-7">
                <div className="group relative aspect-[4/3] lg:aspect-[7/6] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-book1.jpg"
                    alt="Mindful Living Book"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-book1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
                  <div className="absolute inset-0 flex items-start p-4 sm:p-8 lg:p-12">
                    <h3 className="text-lg sm:text-2xl lg:text-3xl xl:text-4xl font-normal text-white drop-shadow-lg">
                      Tools to stay organized <br className="hidden sm:block" />
                      and on top of your goals{" "}
                      <br className="hidden sm:block" />
                      every day.
                    </h3>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="group relative aspect-[4/5] lg:aspect-[4/6] overflow-hidden rounded-xl border border-gray-200 shadow-sm">
                  <ImageWithFallback
                    src="/home-bag2.jpg"
                    alt="Adventure Backpack"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    imageName="home-bag2"
                  />
                  <div className="absolute inset-0 bg-black/60"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="flex items-center gap-3 bg-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-black/20">
                      <span className="text-sm font-medium tracking-wide text-black">
                        LEARN MORE
                      </span>
                      <span className="text-lg">→</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Image + Scrollable Content */}
      <section className="flex flex-col lg:flex-row w-full">
        {/* Left Sticky Image */}
        <div className="w-full lg:w-1/2 relative">
          <div className="lg:sticky lg:top-0 h-[50vh] sm:h-[70vh] lg:h-screen">
            <ImageWithFallback
              src="/home-background1.jpg"
              alt="Adventure Background"
              className="w-full h-full object-cover"
              imageName="home-background1"
            />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2 flex flex-col bg-white">
          {/* Hero Bag Image */}
          <section className="flex items-center justify-center px-4 sm:px-8 py-8 lg:py-12">
            <div className="max-w-lg w-full">
              <ImageWithFallback
                src="/home-herobag1.jpg"
                alt="Hero Adventure Bag"
                className="w-full h-auto rounded-lg shadow-sm"
                imageName="home-herobag1"
              />
            </div>
          </section>

          {/* Mindful Living Section */}
          <section className="min-h-[80vh] lg:min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-20">
            <p className="tracking-widest text-black/70 mb-8 lg:mb-12 text-xs sm:text-sm uppercase">
              IDEAL FOR QUIET EVENINGS
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-light leading-tight mb-8 lg:mb-12 text-black">
              Mindful Living <br /> in Every Page
            </h2>

            <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/80">
                Whether you're looking to reflect on your past, gain clarity on
                your goals, or simply find a few moments of calm in your busy
                day, this beautifully designed guide will inspire and motivate.
              </p>

              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/80">
                Let Journey Within be the companion that helps you navigate
                life's ups and downs with grace and mindfulness.
              </p>
            </div>

            <div className="flex justify-end">
              <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-lg overflow-hidden shadow-md">
                <ImageWithFallback
                  src="/home-book2.jpg"
                  alt="Journey Within Book"
                  className="w-full h-full object-cover"
                  imageName="home-book2"
                />
              </div>
            </div>
          </section>

          {/* Bag Image Section */}
          <section className="flex items-center justify-center lg:justify-end min-h-[50vh] lg:min-h-screen px-6 lg:px-16">
            <div className="py-12 lg:py-20">
              <ImageWithFallback
                src="/home-herobag2.jpg"
                alt="Premium Travel Bag"
                className="h-48 w-48 sm:h-64 sm:w-80 lg:h-80 lg:w-96 xl:h-[500px] xl:w-[560px] object-cover object-center rounded-lg shadow-lg"
                imageName="home-herobag2"
              />
            </div>
          </section>

          {/* Mug Section */}
          <section className="min-h-[80vh] lg:min-h-screen flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-20 py-12 lg:py-20">
            <p className="font-medium mb-8 lg:mb-12 text-xs sm:text-sm tracking-widest uppercase text-black/70">
              QUALITY, SIMPLICITY, AND COMFORT
            </p>

            <h2 className="text-3xl sm:text-4xl lg:text-6xl xl:text-7xl font-light mb-8 lg:mb-12 text-black leading-tight">
              Simplicity Meets <br /> Sophistication
            </h2>

            <div className="space-y-6 lg:space-y-8 mb-8 lg:mb-12 max-w-2xl">
              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/80">
                Designed for those who appreciate the finer things in life, this
                mug combines functionality with sleek, modern design. Its smooth
                ceramic surface is easy to clean and resistant to stains, while
                the comfortable handle ensures a perfect grip every time.
              </p>

              <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-black/80">
                Whether you're enjoying a quiet morning at home or a quick break
                at the office, the Morning Brew Mug adds a touch of
                sophistication to your daily routine.
              </p>
            </div>

            {/* Cup Image */}
            <div className="flex justify-center lg:justify-start lg:ml-24 xl:ml-32">
              <div className="w-36 h-36 sm:w-48 sm:h-48 lg:w-60 lg:h-60 rounded-full overflow-hidden shadow-lg">
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

      {/* Products Section */}
      <section className="bg-white py-16 lg:py-24">
        <div className="px-8 mx-20 sm:px-8 lg:px-12">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 lg:mb-16 gap-6 sm:gap-0">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-black mb-2">
                × OUR PRODUCTS
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">
                All collection
              </p>
            </div>
            <button className="w-full sm:w-auto px-8 py-4 rounded-lg bg-black text-white text-sm font-medium tracking-wide hover:bg-gray-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-black/20">
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
