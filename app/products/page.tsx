"use server";

// Actions
import { getProducts } from "actions";

// Components
import ProductsList from "@components/product/productsList";
import OffersDisplay from "@components/product/offersDisplay";

// Images
import BG from "../assets/bg-products.webp";

const ProductsPage = async () => {
  const { data, pages } = (await getProducts()) || {};
  const products = Array.isArray(data) ? data : [data].flat();

  return (
    <>
      <section className="relative bg-cover bg-center min-h-[400px]" style={{ backgroundImage: `url(${BG.src})` }}>
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative px-2 max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-4">
          <h1 className="text-white text-3xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl">
            Products
          </h1>
          <p className="text-white text-md text-heading xl:text-lg lg:text-md">
            Welcome to our product catalog, where innovation meets excellence! We have a curated selection of
            high-quality products tailored to meet your diverse needs and exceed your expectations. Whether you&#39;re a
            beginner or an expert, we have something for you. All of our products are carefully crafted to enhance your
            experience and make every task seamless. From cutting-edge technology to timeless classics, we offer a wide
            range of options to choose from.
          </p>
        </div>
        <div className="my-4">
          <OffersDisplay />
        </div>
      </section>

      <ProductsList getProducts={getProducts} products={products} pages={pages} />
    </>
  );
};

export default ProductsPage;
