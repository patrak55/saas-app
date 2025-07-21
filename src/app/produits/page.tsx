import Image from "next/image";
import { products } from "../products";

export default function ProductsPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pt-24">
      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">Our Products</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
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
                  <button className="mt-4 w-full rounded-full bg-blue-600 py-2 font-semibold text-white transition-colors duration-300 hover:bg-blue-700">
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
