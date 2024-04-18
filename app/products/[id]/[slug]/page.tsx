// React
import { FC } from "react";

// Components
import ProductImages from "../../components/productImages";
import Breadcrumb from "../../../components/breadCrumb";
import AddToCard from "../../components/addToCart";
import ProductReviews from "./components/productReviews";

// Utils
import http from "../../../utils/http";

// Interfaces
import { ProductPageProps, ProductObj } from "../../../interfaces/product";

const getProduct = async (id: string) => {
  const response = await http.get(`/products/${id}`);
  const product = response?.data as ProductObj;
  return product;
};

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.id);
  const breadCrumbItems = [{ title: "Products", href: "/products" }, { title: product.title }];

  return product ? (
    <>
      <Breadcrumb items={breadCrumbItems} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center p-4">
        <ProductImages key={product.id} alt={product.title} main={product.thumbnail} images={product.images} />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-center sm:text-start">{product.title}</h1>
          <p className="text-md text-foreground/75">{product.description}</p>
          <p className="text-md font-semibold">{product.price}€</p>

          <div className="flex justify-center sm:justify-start">
            <AddToCard product={product} />
          </div>
        </div>
      </div>
      <div className="flex flex-grow">
        <h2 className="text-2xl font-semibold text-center sm:text-start">User Reviews</h2>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 5 }).map((_, index) => (<ProductReviews key={index} productRating={product.rating}/>))}
      </div>
    </>
  ) : (
    // No product found
    <div className="flex flex-grow justify-center items-center">
      <p>No products found</p>
    </div>
  );
};

export default ProductPage;
