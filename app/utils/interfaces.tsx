// Navbar
export type NavbarInterface =  {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

// Footer
export type FooterInterface = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
};

// productsCardProps
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

// ProductDataResponse
export type ProductDataProps = {
  products: ProductInterface;
  total: number;
  limit: number;
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

export type CartItemProps = {
  cart: CartItem;
  totalPrice: number;
  isLoading: boolean;
}

// Search
export type SearchProps = {
  fetchData: () => Promise<void>;
  query: string;
  setQuery: (query: string) => void;
}

// BreadCrumb
export type BreadcrumbProps = {
  title: string;
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

export type PaginationButtonInterface = {
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
}

// Generation
export function generateSlug(title: string): string {
  return title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
}
export function generateClamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
export function generateNewProductLogo(): boolean {
  return Math.random() >= 0.5;
}
