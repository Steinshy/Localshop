// Interfaces
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';

// Products => Page
type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Products => Components => ProductList
type ProductsListProp = {
  pagy: PagyProps;
  data: ProductResponse[];
};

export type { ProductsPageProps, ProductsListProp };
