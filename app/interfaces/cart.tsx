// Interface
import { DiscountResponse } from '@interfaces/discount';
import { ProductResponse } from '@interfaces/product';
import { CartContextType } from '@interfaces/subProviders';

// Components => Product => AddToCart | Data => defaultCart | utils => subProviders
type CartResponse = {
  id: string;
  type: string;
  attributes: {
    id: number;
    createdAt: string;
    updatedAt: string;
    items: CartItem[];
    totalPrice: number;
    coupon: CartCoupon;
    finalPrice: number;
    totalItems: number;
    totalUniqueItems: number;
  };
};

// Actions => getCart | subProviders => GetCart
type getCartResponse = {
  data: CartResponse;
};

// Data => defaultCartCoupon | CartResponse => Coupon
type CartCoupon = {
  data: DiscountResponse;
};

// CartResponse => CartItems
type CartItem = {
  id: number;
  quantity: number;
  price: number;
  product: {
    data: ProductResponse;
  };
};

// Components => Cart => CartProduct
type CartProductProps = {
  cartItem: CartItem;
};

type CartSummaryProps = {
  items: CartItem[];
  coupon: CartCoupon;
  finalPrice: number;
  totalPrice: number;
};

// Components => Cart => OrderProcessButtonProps
type OrderProcessButtonProps = {
  items: CartItem[];
};

type CartButtonDeleteProps = {
  productId?: number;
  cartStore: CartContextType;
};

type AddToCartProps = {
  localProduct: ProductResponse;
  isIconOnly?: boolean;
};

type CartContentViewProps = {
  items: CartItem[];
  cartStore: CartContextType;
};

export type {
  CartResponse,
  getCartResponse,
  CartCoupon,
  CartItem,
  CartProductProps,
  CartSummaryProps,
  OrderProcessButtonProps,
  CartButtonDeleteProps,
  AddToCartProps,
  CartContentViewProps,
};
