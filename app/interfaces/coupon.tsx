type CouponObj = {
  id: string;
  type: string;
  attributes: {
    id: number;
    code: string;
    expiration: string;
    discount: number;
    expired: boolean;
    createdAt: string;
    updatedAt: string;
  };
};

type CartCouponsProps = {
  totalPrice: number;
};

type CouponForm = {
  code?: string;
};

export type { CouponObj, CartCouponsProps, CouponForm };
