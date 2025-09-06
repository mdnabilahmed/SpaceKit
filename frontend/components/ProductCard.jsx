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
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5">
      {products.length > 0 ? (
        products.map((p) => (
          <div
            key={p._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <div className="h-120">
              <img
                src={`http://localhost:3000${p.image}`}
                alt={p.productName}
                className="w-full h-[50vh] object-cover"
              />
            </div>
            <div className="p-4 flex justify-between items-center">
              <div>
                <h2 className="font-semibold">{p.productName}</h2>
                <p className="text-gray-500">{p.color}</p>
              </div>
              <span className="font-bold">${p.price}</span>
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
