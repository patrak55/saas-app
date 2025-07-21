"use client";

import { useContext, useEffect } from "react";
import { CartContext } from "./cartContext";
import Image from "next/image";
import Link from "next/link";

export default function CartModal() {
  const { cart, setCart, modalProduct, setModalProduct } = useContext(CartContext);

  useEffect(() => {
    if (modalProduct) {
      const timer = setTimeout(() => {
        setModalProduct(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [modalProduct, setModalProduct]);

  if (!modalProduct) {
    return null;
  }

  return (
    <div className="fixed top-20 right-4 z-20 w-80 rounded-lg bg-white p-4 shadow-lg">
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
