"use client";

import { useContext, useState } from "react";
import { products } from "../../products";
import { CartContext, Product } from "../../cartContext";
import Image from "next/image";
import { type PageProps } from "next";

export default function ProductPage({ params }: PageProps) {
  const context = useContext(CartContext);
  const product = products.find((p) => p.id === parseInt(params.id));
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(product?.images[0]);

  if (!context) {
    return null;
  }

  const { setCart, setModalProduct } = context;

  const handleAddToCart = (product: Product) => {
    const productWithQuantity = { ...product, quantity };
    setCart((prevCart) => [...prevCart, productWithQuantity]);
    setModalProduct(productWithQuantity);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
        {/* Product Image Section */}
        <div>
          <div className="mb-4 h-96 overflow-hidden rounded-lg">
            <Image
              src={selectedImage}
              alt={product.name}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-5 gap-2">
            {product.images.map((image, index) => (
              <div
                key={index}
                className={`cursor-pointer rounded-lg border-2 ${
                  selectedImage === image ? "border-blue-500" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${product.name} thumbnail ${index + 1}`}
                  width={100}
                  height={100}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details Section */}
        <div className="flex flex-col justify-center">
          <h1 className="mb-2 text-4xl font-bold text-gray-800">{product.name}</h1>
          <p className="mb-4 text-3xl font-semibold text-gray-700">{product.price}</p>
          <p className="mb-6 text-gray-600">
            This is a great product that you will love. It is made of the best materials and is built to last.
          </p>
          <div className="mb-6 flex items-center">
            <label htmlFor="quantity" className="mr-4 font-semibold text-gray-800">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 rounded-lg border border-gray-300 p-2 text-center"
            />
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="w-full rounded-full bg-blue-600 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Recommended Products Section */}
      <div className="mt-16">
        <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">You might also like</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <div key={p.id} className="transform rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
                <a href={`/produits/${p.id}`}>
                  <Image
                    src={p.images[0]}
                    alt={p.name}
                    width={600}
                    height={400}
                    className="w-full rounded-t-lg"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800">{p.name}</h3>
                    <p className="mt-2 text-lg text-gray-600">{p.price}</p>
                  </div>
                </a>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
