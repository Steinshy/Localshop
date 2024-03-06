// Utils - Request
import http from "../../../utils/http";

// Components - ProductImages - AddToCart
import ProductImages from "../../components/productImages";
import AddToCart from "../../components/addToCart";

async function getData(id: string) {
  try {
    const res = await http.get(`/products/${id}`);
    return res;
  } catch (error) {
    console.error(error);
  }
}

export default async function Product({ params }: { params: { id: string } }) {
  const { data: product } = (await getData(params.id)) || {};
  
  return product ? (
    <div className="grid grid-cols-2 gap-4 items-center justify-center p-4">
      <ProductImages
        alt={product.title}
        main={product.thumbnail}
        images={product.images}
      />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="text-md text-foreground/75">{product.description}</p>
        <p className="text-md font-semibold">{product.price}€</p>

        <div className="flex justify-start">
          <AddToCart product={product}/>
        </div>
      </div>
    </div>
  ) : (
    // No product found
    <div className="flex flex-grow justify-center items-center">
      <p>No products found</p>
    </div>
  );
}
