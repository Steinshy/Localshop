// Interface
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';

// Action => getProducts
type getProductsResponse = {
  pagy: PagyProps;
  products: {
    data: ProductResponse[];
  };
};

// Products => Page
type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Products => Composant => ProductList
type ProductsListProp = {
  pagy: PagyProps;
  products: {
    data?: ProductResponse[];
  };
};

export type { getProductsResponse, ProductsPageProps, ProductsListProp };
