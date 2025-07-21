"use client";

import { useContext } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { CartProvider, CartContext } from "./cartContext";
import CartModal from "./cartModal";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function CartIcon() {
  const context = useContext(CartContext);

  if (!context) {
    return null;
  }

  const { cart } = context;

  return (
    <div className="relative">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-gray-600"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
        />
      </svg>
      {cart.length > 0 && (
        <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
          {cart.length}
        </span>
      )}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <nav className="fixed top-0 left-0 right-0 z-10 bg-white shadow-md">
            <div className="container mx-auto flex items-center justify-between p-4">
              <Link href="/" className="text-2xl font-bold text-gray-800">
                MyStore
              </Link>
              <ul className="flex items-center space-x-6">
                <li>
                  <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                </li>
                <li>
                  <Link href="/produits" className="text-gray-600 hover:text-blue-500">Products</Link>
                </li>
                <li>
                  <Link href="/a-propos" className="text-gray-600 hover:text-blue-500">About</Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
                </li>
              </ul>
              <CartIcon />
            </div>
          </nav>
          <main className="pt-16">{children}</main>
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
