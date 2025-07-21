"use client";

import { useContext, useEffect } from "react";
import { CartContext } from "./cartContext";
import Image from "next/image";
import Link from "next/link";

function CartModalContent() {
  const context = useContext(CartContext);

  useEffect(() => {
    if (!context || !context.modalProduct) {
      return;
    }

    const timer = setTimeout(() => {
      context.setModalProduct(null);
    }, 5000);
    return () => clearTimeout(timer);
  }, [context]);

  if (!context || !context.modalProduct) {
    return null;
  }

  const { modalProduct } = context;

  return (
    <div
      className={`fixed top-20 right-4 z-20 w-80 rounded-lg bg-white p-4 shadow-lg transform transition-all duration-500 ease-in-out ${
        modalProduct ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
    >
      <div className="flex items-center">
        <Image
          src={modalProduct.image}
          alt={modalProduct.name}
          width={80}
          height={80}
          className="rounded-lg"
        />
        <div className="ml-4">
          <h3 className="font-bold">{modalProduct.name}</h3>
          <p className="text-gray-600">{modalProduct.price}</p>
        </div>
      </div>
      <Link
        href="/cart"
        className="mt-4 block w-full rounded-full bg-blue-600 py-2 text-center font-semibold text-white transition-colors duration-300 hover:bg-blue-700"
      >
        Finaliser ma commande
      </Link>
    </div>
  );
}

export default function CartModal() {
  const context = useContext(CartContext);

  if (!context || !context.modalProduct) {
    return null;
  }

  return <CartModalContent />;
}
