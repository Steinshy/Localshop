// React
import { useState, FC, useEffect } from "react";

// NextUI
import { Chip } from "@nextui-org/react";

// Icons
import { FaRegCircleCheck } from "react-icons/fa6";

// Interfaces
import { CouponObj, CartCouponsProps, CouponFormProps } from "@interfaces/coupon";

// Utils
import http from "@utils/http";

import CouponValidation from "@components/cart/couponValidation";

const CartCoupons: FC<CartCouponsProps> = ({ totalPrice }) => {
  const [appliedCoupon, setAppliedCoupon] = useState<CouponObj | null>(null);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState<number>(0);

  useEffect(() => {
    const calculateDiscount = () => {
      if (!appliedCoupon) return 0;
      const {
        attributes: { discount },
      } = appliedCoupon;
      return totalPrice - totalPrice * (discount / 100);
    };
    setTotalPriceDiscount(calculateDiscount());
  }, [totalPrice, appliedCoupon]);

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleSubmit = (values: CouponFormProps) => {
    const apiFetch = async () => {
      const response = await http.get(`/coupon/${values.code}`);
      const { data } = response.data as { data: CouponObj };
      console.log(data);
      setAppliedCoupon(data);
    };

    void apiFetch();
  };

  const discount = appliedCoupon?.attributes.discount || 0;

  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Discount:</p>
        <p className="text-lg">{discount}%</p>
      </div>
      <hr className="my-4" />

      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Total:</p>
        <div className="text-lg">
          {totalPrice}€
          {appliedCoupon !== null && (
            <>
              <div className="text-sm text-foreground/75">-{discount}% discount</div>
              <div className="text-md text-foreground">{totalPriceDiscount}€</div>
            </>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <p className="text-small mb-4 text-foreground/75 italic">Shipping and taxes will be calculated at checkout</p>

      {/* Coupon Validation */}
      <CouponValidation handleSubmit={handleSubmit} totalPrice={totalPrice} />

      <div className="flex justify-center mb-4">
        {appliedCoupon ? (
          <Chip
            className="text-white"
            startContent={<FaRegCircleCheck size={18} />}
            size="sm"
            color="secondary"
            variant="solid"
            onClose={handleRemoveCoupon}
          >
            {appliedCoupon.attributes.code} Coupon applied
          </Chip>
        ) : (
          <Chip size="sm" color="secondary" variant="solid">
            No coupon applied
          </Chip>
        )}
      </div>
    </>
  );
};

export default CartCoupons;
