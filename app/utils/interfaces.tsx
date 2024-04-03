import React, { Dispatch, SetStateAction } from "react";

// Utils => UserProvider
export type UserItemsObj = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

// Utils => UserProvider
export type UserContextType = {
  user: UserItemsObj;
  userChecked: boolean;
  update: Dispatch<SetStateAction<UserItemsObj>>;
  isLogged: () => boolean;
};

// Components => Navbar
export type NavbarProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

// Components => Footer
export type FooterProps = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
};

// Products / [ID]/[Slug] => Page
export type ProductObj = {
  id: number;
  description: string;
  price: number;
  title: string;
  category: string;
  thumbnail: string;
  images: [string];
};

// Products => Page
export type ProductDataProps = {
  products: ProductObj;
  total: number;
  limit: number;
};

// Products => Components => ProductCard / AddToCart
export type ProductCardProps = {
  product: ProductObj;
  isLoading?: boolean;
  isIconOnly?: boolean;
};

// Products => Components => ProductImages
export type ProductImagesProps = {
  alt: string;
  main: string;
  images: [string];
};

// Products => Components => Pagination => PaginationProps
export type PaginationProps = {
  total: number;
  skip: number;
  limit: number;
  isLoading: boolean;
  previousPage: () => void;
  nextPage: () => void;
};

// Products => Components => Pagination => PaginationProps
export type PaginationButtonInterface = {
  isDisabled: boolean;
  onClick: () => void;
  children: React.ReactNode;
  startContent?: React.ReactNode;
  endContent?: React.ReactNode;
};

// CartProvider => CartItem
export type CartItemObj = {
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

// Utils => CartProvider
export type CartContextType = {
  data: CartItemObj[];
  update: Dispatch<SetStateAction<CartItemObj[]>>;
};

// Order => Cart => CartItem
export type CartItemProps = {
  cartStore: CartContextType;
  cart: CartItemObj[];
  isLoading: boolean;
};

// Order => CartSummary
export type CartSummaryProps = {
  cart: CartItemObj[];
  setTotalPriceDiscount: number;
  totalPriceDiscount: number;
  totalPrice: number;
  isLoading: boolean;
};

// Order => CartCoupons
export type CartCouponsProps = {
  totalPrice: number;
  setTotalPriceDiscount: number;
  totalPriceDiscount: number;
  isLoading: boolean;
};

// Order => CartCoupons
export type CouponsObject = {
  code: string;
  discount: number;
  active: boolean;
};

// Generation
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}
export function generateClamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
export function generateNewProductLogo(): boolean {
  return Math.random() >= 0.5;
}

export function calculatedDiscount(selectedCoupon: CouponsObject, totalPrice: number): number {
  return totalPrice - totalPrice * (selectedCoupon.discount / 100);
}

export function cartNavigation(pathname: string): string {
  switch (pathname) {
    case "/order/cart":
      return "/order/shipping";
    case "/order/checkout":
      return "";
    default:
      return "/order/checkout";
  }
}

// SubProviders => Default User Data
export const UserDefaultData = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  password: "password",
} as UserItemsObj;
