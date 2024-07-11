// Data => DefaultCoupon
type DiscountResponse = {
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
  }
};

// Components => Cart => CartDiscount
type CartDiscountProps = {
  couponCode?: string;
  couponDiscount?: number;
  totalPrice?: number;
};

// Components => Cart => CartDiscount
type DiscountFormProps = {
  code?: string;
};

export type { DiscountResponse, CartDiscountProps, DiscountFormProps };
