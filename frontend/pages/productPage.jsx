import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `https://api-spacekit.onrender.com/api/products/send/${id}`
        );
        setProduct(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-lg">Loading...</p>
      </div>
    );

  const images =
    product.images && product.images.length > 0
      ? product.images
      : [product.image];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg overflow-hidden shadow-sm transition-all ${
                    selectedImage === index
                      ? "ring-2 ring-black"
                      : "hover:ring-2 hover:ring-gray-300"
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight mb-6">
              {product.title}
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="flex items-center gap-8 mb-8">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                  Color
                </p>
                <p className="text-lg font-medium">{product.color}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">
                  Price
                </p>
                <p className="text-2xl font-semibold">${product.price}</p>
              </div>
            </div>
            <button className="bg-black text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-gray-900 transition-colors inline-flex items-center gap-3 w-fit group">
              BUY NOW
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
