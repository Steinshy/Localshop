// dataDiscount | Interfaces => cart
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

// cartDiscount
export type CartDiscountProps = {
  couponCode?: string;
  couponDiscount?: number;
  totalPrice?: number;
};

// cartDiscount
export type DiscountFormProps = {
  code?: string;
};
