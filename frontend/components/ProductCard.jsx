import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // React Router hook to navigate

  const getProduct = async () => {
    try {
      const res = await axios.get("https://api-spacekit.onrender.com/api/products/send");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
      {products.map((p) => (
        <div
          key={p._id}
          onClick={() => navigate(`/product/${p._id}`)} // Navigate to ProductPage with ID
          className="relative bg-gray-100 overflow-hidden group w-full aspect-[4/5] rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
        >
          <img
            src={`https://api-spacekit.onrender.com${p.image}`}
            alt={p.productName}
            className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
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
