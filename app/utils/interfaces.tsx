import React, { Dispatch, SetStateAction } from "react";

// ========= NAVBAR =========

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

// Composants => Navbar => UsermenuLogged
export type UsermenuLoggedProps = {
  userLastName: string;
  userFirstName: string;
  handleUserMenuOpen: (bool: boolean) => void;
  isUserMenuOpen: boolean;
  handleUserKeySelection: (value: React.Key) => void;
}

// Composants => Navbar => UsermenuNotLogged
export type UsermenuNotLoggedProps = {
  handleUserLogin: () => void;
}

// ========= FOOTER =========

// Components => Footer
export type FooterProps = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
};

// ========= PRODUCTS =========

// Products => [ID]/[Slug] => Page
export type ProductObj = {
  id: number;
  description: string;
  price: number;
  title: string;
  stock: number;
  rating: number;
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

// ========= ORDER => CART =========

// Utils => subProviders => CartItem
export type CartItemObj = {
  id: number;
  color?: string;
  size?: string;
  discount: number;
  quantity: number;
  price: number;
  title: string;
  category: string;
  stock: number;
  thumbnail: string;
};

// Utils => subProviders => CartProvider
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

// Order => Cart => Components -> CartProduct
export type CartProductProps = {
  cartStore: CartContextType;
  itemcart: CartItemObj;
};

// Order => Cart => Components -> CartSummary
export type CartSummaryProps = {
  cart: CartItemObj[];
  totalPrice: number;
  shippingPrice: number;
  taxesPrice: number;
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

// ========= USER =========

// Utils => subProviders => UserProvider
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

// ========= USER => ADDRESS ========= 

// Utils => UserProvider
export type AddressObj = {
  id: number;
  label: string;
  firstname: string;
  lastname: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  [key: string]: string | number | boolean;
  default: boolean;

};

// User => Components -> AddressCard
export type AddressListProps = {
  selected?: number|null,
  setSelected?: (id:number) => void,
  selectable?: boolean
}
 // User => Components -> AddressCard
export type AddressCardProps = {
  selected?: number|null,
  setSelected?: (id:number) => void,
  address: AddressObj,
  selectable?: boolean
}

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

// SubProviders => DefaultUserrData
export const UserDefaultData = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  addresses: [
    {
      id: 1,
      label: "Home",
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
      default: true
    },
    {
      id: 2,
      label: "Home 2",
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
      default: false
    },
    {
      id: 3,
      label: "Home 3",
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
      default: false
    },
    {
      id: 4,
      label: "Home 4",
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
      default: false
    },
    {
      id: 5,
      label: "Home 5",
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
      default: false
    },
  ]
} as UserItemsObj;

// Order => Cart => Components -> CartCoupons
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