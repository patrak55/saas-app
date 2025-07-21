"use client";

import { useContext, useState } from "react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
              <div className="hidden md:flex items-center space-x-6">
                <Link href="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                <Link href="/produits" className="text-gray-600 hover:text-blue-500">Products</Link>
                <Link href="/a-propos" className="text-gray-600 hover:text-blue-500">About</Link>
                <Link href="/contact" className="text-gray-600 hover:text-blue-500">Contact</Link>
                <CartIcon />
              </div>
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                    />
                  </svg>
                </button>
              </div>
            </div>
            {isMenuOpen && (
              <div className="md:hidden">
                <Link href="/" className="block p-4 text-gray-600 hover:text-blue-500">Home</Link>
                <Link href="/produits" className="block p-4 text-gray-600 hover:text-blue-500">Products</Link>
                <Link href="/a-propos" className="block p-4 text-gray-600 hover:text-blue-500">About</Link>
                <Link href="/contact" className="block p-4 text-gray-600 hover:text-blue-500">Contact</Link>
                <div className="p-4">
                  <CartIcon />
                </div>
              </div>
            )}
          </nav>
          <main className="pt-16">{children}</main>
          <CartModal />
        </CartProvider>
      </body>
    </html>
  );
}
