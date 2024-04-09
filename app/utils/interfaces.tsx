import React, { Dispatch, SetStateAction } from "react";

// Utils => UserProvider
export type AddressObj = {
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
};

export type UserItemsObj = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  addresses: AddressObj[];
};

// Utils => UserProvider
export type UserContextType = {
  user: UserItemsObj;
  userChecked: boolean;
  update: Dispatch<SetStateAction<UserItemsObj>>;
  isLogged: () => boolean;
  logout: () => void;
};

// Components => Navbar
export type NavbarProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

// Composants => Navbar => CartBadge
export type CartBadgeProps = {
  quantity: number;
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

// Order => Cart => Components -> CartItem
export type CartItemProps = {
  cartStore: CartContextType;
  cart: CartItemObj[];
  isLoading: boolean;
};

// order => Cart => Components -> CartProduct
export type CartProductProps = {
  cartStore: CartContextType;
  itemcart: CartItemObj;
};

// Order => Cart => Components -> CartSummary
export type CartSummaryProps = {
  cart: CartItemObj[];
  totalPrice: number;
  isLoading: boolean;
};

// Order => Cart => Components -> CartCoupons
export type CartCouponsProps = {
  totalPrice: number;
  isLoading: boolean;
};

// Order => Cart => Components -> CartCoupons
export type CouponsObject = {
  code: string;
  discount: number;
  active: boolean;
  expired: boolean;
};

// Generation
export function generateSlug(title: string): string {
  return title.toLowerCase().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}
export function generateClamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}
export function generateNewProductLogo(): boolean {
  return Math.random() >= 0.5;
}

export function calculatedDiscount(selectedCoupon: CouponsObject, totalPrice: number): number {
  return (totalPrice - totalPrice * (selectedCoupon.discount / 100));
}

export function cartNavigation(pathname: string): string {
  switch (pathname) {
    case "/order/cart":
      return "/order/checkout";
    case "/order/checkout":
      return "/order/shipping";
    case "/order/shipping":
      return "/order/cart";
    default:
      return "/order/cart";
  }
}

// SubProviders => Default User Data
export const UserDefaultData = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  addresses: [
    {
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
    },
  ]
} as UserItemsObj;

export const couponsDefaultData = [
  {
    code: "DISCOUNT10",
    discount: 10,
    active: true,
    expired: false,
  },
  {
    code: "DISCOUNT20",
    discount: 20,
    active: true,
    expired: false,
  },
  {
    code: "DISCOUNT50",
    discount: 50,
    active: true,
    expired: false,
  },
  {
    code: "DISCOUNTEXPIRED",
    discount: 0,
    active: false,
    expired: true,
  },
] as CouponsObject[];