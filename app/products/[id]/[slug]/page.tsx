// React
import { FC } from "react";

// Utils
import http from "@/app/utils/http";

// Components
import ProductImages from "../../components/productImages";
import Breadcrumb from "../../../components/breadCrumb";
import AddToCard from "../../components/addToCart";
import ProductReviews from "./components/productReviews";

// Interfaces
import { ReviewProps } from "@/app/interfaces/reviews";
import { ProductPageProps, ProductObj } from "@/app/interfaces/product";

const getProduct = async (id: string) => {
  const response = await http.get(`/products/${id}`);
  const product = response?.data as { data: ProductObj };
  return product;
};

const getProductReviews = async (id: string) => {
  const response = await http.get(`/products/${id}/reviews`);
  const { reviews } = response?.data as { reviews: { data: ReviewProps[] } };
  return reviews;
};

const ProductPage: FC<ProductPageProps> = async ({ params }) => {
  const { data:product } = await getProduct(params.id);
  const { data:reviews } = await getProductReviews(params.id);
  const { attributes, id } = product;
  const { title, description, thumbnail, price, images } = attributes;
  const breadCrumbItems = [{ title: "Products", href: "/products" }, { title: title }];

  return product ? (
    <>
      <Breadcrumb items={breadCrumbItems} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center p-4">
        <ProductImages key={id} alt={title} main={thumbnail.full} images={images} />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-center sm:text-start">{title}</h1>
          <p className="text-md text-foreground/75">{description}</p>
          <p className="text-md font-semibold">{price}€</p>

          <div className="flex justify-center sm:justify-start">
            <AddToCard product={product} />
          </div>
        </div>
      </div>
      <div className="flex flex-col flex-grow justify-center p-4">
        <h2 className="text-2xl font-semibold text-center mb-4">User Reviews</h2>
        <div className="grid grid-cols-4 gap-4">
          {reviews.map((review) => (
            <ProductReviews key={`review_${review.id}`} review={review}/>
          ))}
        </div>
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
