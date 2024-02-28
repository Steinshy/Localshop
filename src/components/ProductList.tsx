import ProductCard from "./productCard";
import useFetchProducts from "./hooks/useFetchProducts";

const ProductList = () => {
  const URL = "/products";
  const { products, isLoading } = useFetchProducts(URL);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 p-2">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isLoading={isLoading} />
      ))}

      {/* Skeletons */}
      {isLoading && (
        Array.from({length: 10}).map((_item, index) => (
          <div key={index} className="animate-pulse bg-gray-200 w-full h-[300px] rounded-md shadow-lg"></div>
        ))
      )}

      {/* No products */}
      {!isLoading && products.length === 0 && (
        <div className="text-center w-full col-span-full">
          <p>No products found</p>
        </div>
      )}

      {/* Pagination here */}
    </div>
  );
};

export default ProductList;
