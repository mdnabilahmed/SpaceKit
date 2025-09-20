import axios from "axios";
import { useEffect, useState } from "react";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const [imageErrors, setImageErrors] = useState({});

  const getProduct = async () => {
    try {
      const res = await axios.get(
        "https://api-spacekit.onrender.com/api/products/send"
      );
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle image loading errors
  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

  // Enhanced image component with fallback and responsive handling
  const ProductImage = ({ src, alt, productId }) => (
    <img
      src={imageErrors[productId] ? "/placeholder.jpg" : src}
      alt={alt}
      className="w-full h-full object-cover object-center transition-all duration-300 ease-out hover:scale-105"
      onError={() => handleImageError(productId)}
      loading="lazy"
    />
  );

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 p-3 sm:p-4 md:p-5">
      {products.length > 0 ? (
        products.map((p) => (
          <div
            key={p._id}
            className="bg-white h-auto shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col rounded-lg border border-gray-100"
          >
            {/* Image Area - Enhanced responsive sizing */}
            <div className="flex-1 aspect-square sm:aspect-[4/5] md:aspect-square lg:aspect-[4/5] xl:aspect-square overflow-hidden">
              <ProductImage
                src={`https://api-spacekit.onrender.com${p.image}`}
                alt={p.productName}
                productId={p._id}
              />
            </div>

            {/* Text Area - Improved responsive typography and spacing */}
            <div className="p-3 sm:p-4 md:p-4 lg:p-5 flex-shrink-0">
              <h2 className="font-semibold text-sm sm:text-base md:text-base lg:text-lg text-gray-900 mb-1 sm:mb-2 line-clamp-2 leading-tight">
                {p.productName}
              </h2>
              <p className="text-gray-500 text-xs sm:text-sm md:text-sm mb-2 sm:mb-3 capitalize">
                {p.color}
              </p>
              <span className="font-bold text-base sm:text-lg md:text-lg lg:text-xl text-gray-900 block">
                ${p.price}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-3 xl:col-span-3 2xl:col-span-4 text-center py-8 sm:py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            {/* Loading spinner */}
            <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-b-2 border-gray-900"></div>
            <p className="text-gray-600 text-sm sm:text-base md:text-lg">
              Loading products...
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
