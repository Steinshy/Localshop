// productsCard
export type ProductCardProps = {
  product: ProductInterface;
  isLoading?: boolean;
  isIconOnly?: boolean;
};

// productsCard
export type ProductInterface = {
  id: number;
  description: string;
  price: number;
  title: string;
  category: string;
  thumbnail: string;
  images: [string];
};

// Footer
export type LinkItemProps = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
};

// ProductImages
export type ProductImagesProps = {
  alt: string;
  main: string;
  images: [string];
};

// CartItem
export type CartItem = {
  id: number;
  color?: string;
  size?: string;
  discount: number;
  quantity: number;
  price: number;
  title: string;
  category: string;
  thumbnail: string;
};

// BreadCrumb
export type BreadcrumbProps = {
  title: string;
  id: string;
}

// Pagination
export type PaginationInterface = {
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  previousPage: () => void;
  nextPage: () => void;
};

// Generation
export function generateSlug(title: string): string {
  return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
export function generateClamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}