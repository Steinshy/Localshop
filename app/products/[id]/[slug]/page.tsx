// Utils - Request
import http from "../../../utils/http";

// ProductImages
import ProductImages from "../../components/productImages";
import { ProductObj } from "../../../utils/interfaces";

// Components
import Breadcrumb from "./components/breadCrumb";
import AddToCard from "../../components/addToCart";

async function getData(id: string): Promise<{data: ProductObj | undefined}> {
  let response: { data: ProductObj } | undefined;

  try {
    response = await http.get(`/products/${id}`);
  } catch (error) {
    console.error(`Error fetching product with id ${id}:`, error);
  }
  return { data: response?.data || undefined };
}

export default async function Product({ params }: { params: { id: string } }) {
  const { data: product } = (await getData(params.id)) || {};
  
  return product ? (
    <>
      <Breadcrumb title={product.title} />
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center justify-center p-4">
        <ProductImages
          alt={product.title}
          main={product.thumbnail}
          images={product.images}
        />

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold text-center sm:text-start">{product.title}</h1>
          <p className="text-md text-foreground/75">{product.description}</p>
          <p className="text-md font-semibold">{product.price}€</p>

          <div className="flex justify-center sm:justify-start">
            <AddToCard product={product} />
          </div>
        </div>
      </div>
    </>
  ) : (
    // No product found
    <div className="flex flex-grow justify-center items-center">
      <p>No products found</p>
    </div>
  );
}
