"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Data from "../../../db/db";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

const Carddetails = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = () => {
      const foundProduct = Data.find((p) => p.id.toString() === params.id);
      if (foundProduct) {
        const product: Product = {
          id: foundProduct.id.toString(),
          title: foundProduct.title,
          description: foundProduct.description,
          price: foundProduct.price,
          image: foundProduct.image,
          category: foundProduct.category,
          rating: foundProduct.rating,
        };
        setProduct(product);
      } else {
        setError("Product not found.");
      }
      setLoading(false);
    };
    fetchProduct();
  }, [params.id]);

  if (loading) return <div className="text-center text-xl py-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 text-lg py-10">{error}</div>;

  const handleAddToCart = () => {
    if (product) {
      const productWithNumberId = { ...product, id: Number(product.id) };
      addToCart(productWithNumberId);
      toast.success("Product added to cart!", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <>
      <div className="container mx-auto p-6 flex flex-col lg:flex-row  justify-center h-screen items-center gap-12">
        {/* Product Image */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="relative w-80 h-80 shadow-xl">
            <Image
              src={product?.image ?? ""}
              alt={product?.title ?? ""}
              layout="fill"
              objectFit="contain"
              className="rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full lg:w-1/2 flex flex-col items-start">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{product?.title}</h1>
          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {product?.description}
          </p>
          <p className="text-2xl font-semibold text-blue-500 mb-6">
            ${product?.price.toFixed(2)}
          </p>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-blue-700 border-t-2 via-blue-500 to-blue-300 border-b text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-transform duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Carddetails;
