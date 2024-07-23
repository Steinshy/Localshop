// Interfaces
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';

// productsPage
export type ProductsPageProps = {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// productsPage
export type ProductsCategoryPageProps = {
  params: {
    categorySlug: string;
  };
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
};

// productsList
export type ProductsListProp = {
  pagy: PagyProps;
  data: ProductResponse[];
  categorySlug?: string;
};

// productsHeader
export type ProductsHeaderProps = {
  title?: string;
};
