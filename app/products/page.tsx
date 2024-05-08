"use client";

// React
import { FC, useState, useEffect, useCallback } from "react";

// Utils
import http from "@/app/utils/http";
import { products_url, products_search_url } from "@/app/utils/helpers";

// Component
import ProductCard from "./components/productCard";
import SkeletonProduct from "./components/skeletonProduct";
import Pagination from "./components/pagination";
import OffersDisplay from "./components/offersDisplay";

// Icons
import { Input, Chip } from "@nextui-org/react";
import { FaSearch } from "react-icons/fa";

// Interfaces
import { ProductObj, ProductDataProps } from "@/app/interfaces/product";

// Images
import BG from "../assets/bg-products.webp";

const ProductsPage: FC = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [products, setProducts] = useState<ProductObj[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState<string>("");
  const limit = 12;

  const previousPage = () => {
    setIsLoading(true);
    setPage(page - 1);
  };

  const nextPage = () => {
    setIsLoading(true);
    setPage(page + 1);
  };

  const fetchData = useCallback(async () => {
    try {
      const url = query.length > 0 ? products_search_url(page, query) : products_url(page);
      const response = await http.get<ProductDataProps>(url);
      const { products, pagy } = response?.data || {};
      const { pages } = pagy;
      const { data } = products;

      setProducts(Array.isArray(data) ? data : [data]);
      setTotal(pages || 0);
      setIsLoading(false);
    } catch (error) {
      setProducts([]);
    }
  }, [page, query]);

  // Fetch data
  useEffect(() => {
    fetchData().catch((error) => {
      console.error("An error occurred while fetching data:", error);
    });
  }, [fetchData, query, page]);

  // Reset skip when query changes
  useEffect(() => {
    setPage(1);
  }, [query]);

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchData().catch((error) => {
      console.error("An error occurred while fetching data:", error);
    });
  };

  const clearQuery = () => {
    setQuery("");
  };

  return (
    <div className="flex flex-col flex-grow">
      <div
        className="relative flex flex-col items-center justify-center min-h-[400px]"
        style={{
          backgroundImage: `url(${BG.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative px-2 max-w-screen-lg mx-auto flex flex-col items-center justify-center gap-4">
          <h1 className="text-white text-3xl font-bold tracking-tight text-heading lg:text-4xl xl:text-5xl">
            Products
          </h1>
          <p className="text-white text-md text-heading xl:text-lg lg:text-md">
            Welcome to our product catalog, where innovation meets excellence! We are thrilled to present a curated
            selection of top-notch products designed to meet your diverse needs and exceed your expectations. Whether
            you&#39;re a seasoned professional or just starting your journey, our range of products is carefully crafted
            to enhance your experience and make every task seamless. From cutting-edge technology to timeless classics,
            we have something for everyone.
          </p>
        </div>

        <div className="my-4">
          <OffersDisplay />
        </div>
      </div>

      {/* Search */}
      <form onSubmit={handleSubmit} action="#" className="w-full max-w-screen-2xl mx-auto my-4 px-2">
        <Input
          aria-label="Search"
          placeholder="Type and press enter..."
          type="search"
          value={query}
          onChange={handleQueryChange}
          onClear={clearQuery}
          startContent={<FaSearch />}
          size="lg"
          isDisabled={isLoading}
          isClearable
        />
      </form>

      {/* Products Card */}
      <div className="flex flex-col flex-grow justify-between">
        {query.length > 0 && (
          <div className="flex items-center gap-4 mb-4 px-2">
            <Chip onClose={clearQuery}>{query}</Chip>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 px-2 pb-4">
          {isLoading
            ? Array(12).map((_, index) => <SkeletonProduct key={index} />)
            : products.length > 0 && products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>

      {!isLoading && (
        <Pagination
          isLoading={isLoading}
          pages={total}
          page={page}
          previousPage={previousPage}
          nextPage={nextPage}
        />
      )}
    </div>
  );
};

export default ProductsPage;
