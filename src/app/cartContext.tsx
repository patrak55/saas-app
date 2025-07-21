"use client";

import { createContext, useState, ReactNode } from "react";

export interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface CartContextType {
  cart: Product[];
  setCart: React.Dispatch<React.SetStateAction<Product[]>>;
  modalProduct: Product | null;
  setModalProduct: (product: Product | null) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);
  const [modalProduct, setModalProduct] = useState<Product | null>(null);

  return (
    <CartContext.Provider value={{ cart, setCart, modalProduct, setModalProduct }}>
      {children}
    </CartContext.Provider>
  );
};
