// Data => DefaultCoupon
export type DiscountResponse = {
  id: string;
  type: string;

  attributes: {
    id: number;
    code: string;
    discount: number;
    expiration: string;
    expired: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

// Components => Cart => CartDiscount
export type CartDiscountProps = {
  couponCode?: string;
  couponDiscount?: number;
  totalPrice?: number;
};

// Components => Cart => CartDiscount
export type DiscountFormProps = {
  code?: string;
};
