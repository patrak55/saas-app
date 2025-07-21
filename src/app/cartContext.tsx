"use client";

import { createContext, useState } from "react";

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [modalProduct, setModalProduct] = useState(null);

  return (
    <CartContext.Provider value={{ cart, setCart, modalProduct, setModalProduct }}>
      {children}
    </CartContext.Provider>
  );
};
