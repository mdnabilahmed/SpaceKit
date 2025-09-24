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

  const handleImageError = (productId) => {
    setImageErrors((prev) => ({ ...prev, [productId]: true }));
  };

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
    <div
      className=" 
        flex flex-col md:flex-row 
        flex-wrap md:flex-nowrap 
        justify-center items-center 
        gap-x-[7px] px-[40px] w-full pt-[20px]
      "
    >
      {products.length > 0 ? (
        products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow duration-300  
                       overflow-hidden rounded-[12px] border border-gray-100 aspect-square 
                       flex-shrink-0 w-full md:w-[300px] mx-[10px] md:mx-0"
          >
            {/* 80% Image */}
            <div className="h-[80%] w-full overflow-hidden flex items-center justify-center">
              <ProductImage
                src={`https://api-spacekit.onrender.com${p.image}`}
                alt={p.productName}
                productId={p._id}
              />
            </div>

            {/* 20% Details */}
            <div className="h-[20%] w-full px-[10px] flex items-center justify-between">
              {/* Left side: Name + Color */}
              <div className="flex flex-col text-left">
                <h2 className="font-semibold text-[14px] text-gray-900 uppercase tracking-wide truncate">
                  {p.productName}
                </h2>
                <p className="text-gray-500 text-[11px] uppercase tracking-wider truncate">
                  {p.color}
                </p>
              </div>

              {/* Right side: Price */}
              <span className="font-bold text-[14px] text-gray-900 text-right">
                ${p.price}
              </span>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full text-center py-[50px]">
          <div className="flex flex-col items-center justify-center space-y-[16px]">
            <div className="animate-spin rounded-full h-[40px] w-[40px] border-b-2 border-gray-900"></div>
            <p className="text-gray-600 text-[16px]">Loading products...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
