// React
import { FC } from "react";

// Actions
import { getProducts } from "actions";

// Components
import ProductsList from "@components/products/productsList";

// NextUI
import { Card, Image } from "@nextui-org/react";

// Assets
import { offer1, offer2, offer3, offer4, BG } from "../assets/index";

// Interfaces
import { ProductsPageProps } from "@interfaces/products";

// Data
import { defaultProducts } from "@data/products";

const ProductsPage:FC<ProductsPageProps> = async ({ searchParams }) => {
  const urlParams = searchParams || {}
  const { products, pagy } = await getProducts(1, urlParams['q']?.toString() || '') || defaultProducts;
  const offersArray = [offer1, offer2, offer3, offer4];

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
        <div className="aspectRatio:16/9 max-w-screen-lg mx-auto gap-2 px-2 pb-4 my-4 grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 ">
          {offersArray.map((offer, index) => (
            <Card key={index} className="max-w-screen-lg mx-auto">
              <Image className="" width={520} height={270} alt="offersImage" src={offer.src} />
            </Card>
          ))}
        </div>
      </section>
      <div className="gap-2 px-2 pb-4 my-4">
        <ProductsList products={products} pagy={pagy} />
      </div>
    </>
  );
};

export default ProductsPage;
