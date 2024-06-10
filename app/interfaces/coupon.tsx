type CouponsObject = {
  id: number;
  category_id: number;
  code: string;

  discount: number;
  expiration: string;
};

type CartCouponsProps = {
  totalPrice: number;
};

type CouponFormProps = {
  code?: string;
};

type CouponValidationProps = {
  handleSubmit: (values: CouponFormProps) => void;
  handleRemoveCoupon: (event: React.MouseEvent<HTMLButtonElement>) => void;
  totalPrice: number;
};

export type { CartCouponsProps, CouponFormProps, CouponsObject, CouponValidationProps };
