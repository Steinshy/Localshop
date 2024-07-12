// Interfaces
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';

// Products => Page
export type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Products => Components => ProductList
export type ProductsListProp = {
  pagy: PagyProps;
  data: ProductResponse[];
};