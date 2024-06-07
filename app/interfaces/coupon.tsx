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

type CouponFormProps = {
  code?: string;
};

interface CouponValidationProps {
  handleSubmit: (values: CouponFormProps) => void;
  totalPrice: number;
}

export type { CouponObj, CartCouponsProps, CouponFormProps, CouponValidationProps };
