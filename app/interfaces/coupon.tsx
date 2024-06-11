import { CartResponse } from "@interfaces/cart"
type CouponsObject = {
  id: string;
  type: string;
  category_id: number;
  code: string;
  discount: number;
  expiration: string;
};

type CartCouponsProps = {
  discount: number;
  coupon: CouponsObject;
  finalPrice: number;
  totalPrice: number;
  update: (data: CartResponse) => void;
};

type CouponFormProps = {
  code?: string;
};
type CouponValidationProps = {
  errors: CouponFormProps;
  handleSubmit: (values: CouponFormProps) => void;
  totalPrice: number;
};

export type { CartCouponsProps, CouponsObject, CouponFormProps, CouponValidationProps };
