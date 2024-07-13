// Interfaces
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';

// Products => Page
export type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Products => Page
export type ProductsCategoryPageProps = {
  params: {
    categorySlug: string;
  }
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// Products => Components => ProductList
export type ProductsListProp = {
  pagy: PagyProps;
  data: ProductResponse[];
  categorySlug?: string;
};

// Products => Components => ProductsHeader
export type ProductsHeaderProps = {
  title?: string;
}
