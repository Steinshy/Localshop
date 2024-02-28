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
    </div>
  );
};

export default ProductList;
