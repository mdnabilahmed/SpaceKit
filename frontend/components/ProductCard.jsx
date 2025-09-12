import axios from "axios";
import { useEffect, useState } from "react";

const ProductCard = () => {
  const [products, setProducts] = useState([]);

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

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3">
      {products.length > 0 ? (
        products.map((p) => (
          <div
            key={p._id}
            className="bg-white h-auto shadow-md rounded-lg overflow-hidden p-4 flex flex-col"
          >
            {/* Image Area (on top, fills container) */}
            <div className="flex-1">
              <img
                src={`https://api-spacekit.onrender.com${p.image}`}
                alt={p.productName}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Text Area (at bottom) */}
            <div className="p-2">
              <h2 className="font-semibold">{p.productName}</h2>
              <p className="text-gray-500">{p.color}</p>
              <span className="font-bold block">${p.price}</span>
            </div>
          </div>
        ))
      ) : (
        <p className="col-span-3 text-center">Loading products...</p>
      )}
    </div>
  );
};

export default ProductCard;
