"use client";

import { useContext } from "react";
import Image from "next/image";
import { products } from "./products";
import Link from "next/link";
import { CartContext, Product } from "./cartContext";

export default function Home() {
  const context = useContext(CartContext);

  if (!context) {
    return null;
  }

  const { setCart, setModalProduct } = context;

  const handleAddToCart = (product: Product) => {
    setCart((prevCart: Product[]) => [...prevCart, product]);
    setModalProduct(product);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-16">
      <section className="bg-gray-100 pt-32 pb-16 text-center w-full">
        <div className="container mx-auto">
          <h1 className="text-5xl font-extrabold text-gray-900">Your Awesome Store</h1>
          <p className="mt-4 text-xl text-gray-600">The best products, just for you.</p>
          <Link
            href="/produits"
            className="mt-8 inline-block rounded-full bg-blue-600 px-10 py-4 text-lg font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105"
          >
            Shop Now
          </Link>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">Our Products</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <div key={product.id} className="transform rounded-lg bg-white shadow-lg transition-transform duration-300 hover:scale-105">
                <Image
                  src={product.image}
                  alt={product.name}
                  width={600}
                  height={400}
                  className="w-full rounded-t-lg"
                />
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
                  <p className="mt-2 text-lg text-gray-600">{product.price}</p>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full rounded-full bg-blue-600 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
