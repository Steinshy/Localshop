import React, { Dispatch, SetStateAction, ReactNode } from "react";

// ========= Root =========

export type RootLayoutProps = {
  children: React.ReactNode;
};

// ========= PROVIDERS =========

export type ProvidersProps = {
  children: React.ReactNode;
};

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
};

// Composants => Navbar => UsermenuNotLogged
export type UsermenuNotLoggedProps = {
  handleUserLogin: () => void;
};

// ========= FOOTER =========

// Components => Footer
export type FooterProps = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
};

// ========= PRODUCTS =========

// Products => Page
export type ProductPageProps = {
  params: {
    id: string;
  };
};

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

// Product => [ID]/[Slug] => components => Breadcrumb
export type BreadcrumbProps = {
  items: Array<{ title: string; href?: string | undefined }>;
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

// Order => Cart
export type CartProps = {
  children: React.ReactNode;
};

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

// User => Layout
export type UserLayoutProps = {
  children: ReactNode;
};

// Utils => subProviders => UserProvider
export type UserItemsObj = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  addresses: AddressObj[];
  orders: OrdersObj[];
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
 
export type OrdersObj = {
  id: number;
  label: string;
  date: string;
  productsTotal: number;
  status: string;
  paymentType: string;
  isPaid: boolean;
  total: number;
  products: CartItemObj[];
};

// User => Components -> AddressCard
export type AddressListProps = {
  selected?: number | null;
  setSelected?: (id: number) => void;
  selectable?: boolean;
};
// User => Components -> AddressCard
export type AddressCardProps = {
  selected?: number | null;
  setSelected?: (id: number) => void;
  address: AddressObj;
  selectable?: boolean;
};

// ========== USER => ORDERS =========

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

// SubProviders => DefaultUserrData
const generateDefaultAdresses = () => {
  const addresses = [];
  for (let i = 1; i < 6; i++) {
    addresses.push({
      id: i,
      label: `Home ${i}`,
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
      default: i === 3,
    });
  }
  return addresses;
}

const paymentmethods = [
  {
    id: 1,
    label: "Credit Card",
    default: true,
  },
  {
    id: 2,
    label: "Paypal",
    default: false,
  },
  {
    id: 3,
    label: "Bank Transfer",
    default: false,
  }
];

const generateDefaultOrders = () => {
  const orders = [];
  for (let i = 1; i < 6; i++) {
    orders.push({
      id: i,
      label: `Order ${i}`,
      date: "2021-07-01",
      productsTotal: 2,
      status: "Delivered",
      paymentType: paymentmethods[0].label,
      isPaid: true,
      total: 2298,
      products: [
        {
          id: 1,
          title: "iPhone 9",
          price: 549,
          quantity: 2,
          thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        },
        {
          id: 6,
          title: "MacBook Pro",
          price: 1749,
          quantity: 1,
          thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
        },
      ],
    });
  }
  return orders;
}

export const UserDefaultData = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  addresses: generateDefaultAdresses(),
  orders: generateDefaultOrders()
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