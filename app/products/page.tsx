"use client";

// Components - ProductList
import ProductList from "./components/productList";

export default function Products() {
  return (
    <>
      <div className="flex flex-col flex-grow justify-center items-center my-1">
        <h1 className="text-5xl">Our products</h1>
      </div>
      <ProductList/>
    </>
  );
}
