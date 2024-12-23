import Data from "@/db/db";
import Link from "next/link";
import React from "react";
import Image from "next/image";

interface Product {
  id: number;
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

const ProductList = () => {
  const products = Data;

  return (
    <div className="container mx-auto px-4 py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <h1 className="text-5xl font-extrabold text-center mb-16 text-gray-800 tracking-wide">
        Latest Products
      </h1>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

function ProductCard({ product }: { product: Product }) {
  const maxDescriptionLength = 100;
  const description =
    product.description.length > maxDescriptionLength
      ? product.description.substring(0, maxDescriptionLength) + "..."
      : product.description;

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Image Container */}
      <div className="relative group">
        <Image
          src={product.image}
          alt={product.title}
          width={350} 
          height={450}
          className="w-full h-64 object-contain bg-white p-4"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-end items-start p-4">
          <span className="text-white text-sm bg-blue-600 rounded-full px-3 py-1">
            {product.rating.rate.toFixed(1)} ★
          </span>
        </div>
      </div>
      {/* Card Content */}
      <div className="p-6 flex flex-col">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate">
          {product.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4 leading-relaxed">
          {description}
        </p>
        <div className="mt-auto flex items-center justify-between">
          <p className="text-xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </p>
          <Link
            href={`./products/${product.id}`}
            className="px-4 py-2 bg-gradient-to-r from-blue-700 border-t-2 via-blue-500 to-blue-300 border-b text-white text-sm font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
