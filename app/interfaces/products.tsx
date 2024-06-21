// Interface
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';

// Products => Page
type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Action => getProducts
type getProductsResponse = {
  products: {
    data: ProductResponse[];
  };
  pagy: PagyProps;
};

// Products => Composant => ProductList
type ProductsListProp = {
  products: {
    data: ProductResponse[];
  };
  pagy: PagyProps;
};

export type { ProductsPageProps, getProductsResponse, ProductsListProp };
