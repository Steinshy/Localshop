// Interface
import { getCartResponse } from "@interfaces/cart";

type CouponsResponse = {
  id: string;
  type: string;
  category_id: number;
  code: string;
  discount: number;
  expiration: string;
};

type CartCouponsProps = {
  discount: number;
  coupon: CouponsResponse;
  finalPrice: number;
  totalPrice: number;
  update: (data: getCartResponse) => void;
};

type CouponFormProps = {
  code?: string;
};

export type { CouponsResponse, CartCouponsProps, CouponFormProps };
