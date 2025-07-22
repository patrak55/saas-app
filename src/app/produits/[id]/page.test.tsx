import { render, screen } from "@testing-library/react";
import ProductPage from "./page";
import { CartContext, Product } from "../../cartContext";

const mockProduct: Product = {
  id: 1,
  name: "Classic Tee",
  price: "$19.99",
  images: [
    "https://placehold.co/600x400/png?text=Tee+Front",
    "https://placehold.co/600x400/png?text=Tee+Back",
    "https://placehold.co/600x400/png?text=Tee+Detail",
  ],
};

const mockCartContext = {
  cart: [],
  setCart: () => {},
  modalProduct: null,
  setModalProduct: () => {},
};

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/produits/1",
      pathname: "",
      query: { id: "1" },
      asPath: "",
    };
  },
}));

describe("ProductPage", () => {
  it("renders product details", () => {
    render(
      <CartContext.Provider value={mockCartContext}>
        <ProductPage params={{ id: "1" }} />
      </CartContext.Provider>
    );

    expect(screen.getByText("Classic Tee")).toBeInTheDocument();
    expect(screen.getByText("$19.99")).toBeInTheDocument();
  });
});
