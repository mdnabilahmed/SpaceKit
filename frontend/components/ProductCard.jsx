import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getProduct = async () => {
    try {
      const res = await axios.get(
        "https://api-spacekit.onrender.com/api/products"
      );
      setProducts(res.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getBase = () => {
    if (
      typeof process !== "undefined" &&
      process.env &&
      process.env.REACT_APP_API_BASE
    ) {
      return process.env.REACT_APP_API_BASE;
    }
    return "https://api-spacekit.onrender.com";
  };

  const getImageSrc = (p) => {
    const base = getBase();
    if (!p) return `${base}/placeholder.png`;
    if (p.image && typeof p.image === "string") {
      if (p.image.startsWith("http")) return p.image;
      if (p.image.startsWith("/uploads")) return `${base}${p.image}`;
    }
    if (Array.isArray(p.images) && p.images.length) {
      const first = p.images[0];
      if (first && typeof first === "string") {
        if (first.startsWith("http")) return first;
        if (first.startsWith("/uploads")) return `${base}${first}`;
      }
    }
    return `${base}/placeholder.png`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {products.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/product/${p._id}`)}
          className="relative bg-gray-100 overflow-hidden group w-full aspect-[4/5] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <img
            src={getImageSrc(p)}
            alt={p.productName || "product"}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = `${getBase()}/placeholder.png`;
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-full bg-white flex justify-between items-center px-6 border-t border-gray-200"
            style={{ height: "130px" }}
          >
            <div className="flex flex-col justify-center">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900 uppercase tracking-wide">
                {p.productName}
              </h2>
              <p className="text-base md:text-lg text-gray-500 uppercase tracking-wide">
                {p.color}
              </p>
            </div>
            <span className="text-lg md:text-xl font-semibold text-gray-900">
              ${p.price}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
