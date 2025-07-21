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
    <div className="container mx-auto pt-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image
            src={selectedImage}
            alt={product.name}
            width={600}
            height={400}
            className="w-full rounded-lg"
          />
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${product.name} thumbnail ${index + 1}`}
                width={200}
                height={133}
                className={`w-full rounded-lg cursor-pointer ${
                  selectedImage === image ? "border-2 border-blue-500" : ""
                }`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="mt-4 text-2xl font-bold">{product.price}</p>
          <p className="mt-4">
            This is a great product that you will love. It is made of the best
            materials and is built to last.
          </p>
          <div className="mt-8">
            <label htmlFor="quantity" className="mr-4 font-bold">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-20 rounded-lg border p-2"
            />
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="mt-8 w-full rounded-full bg-blue-600 py-4 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
