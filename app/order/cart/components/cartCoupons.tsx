// React
import { useState, FC, useEffect } from "react";

// Modules
import { Formik, Form, Field } from "formik";

// NextUI
import { Chip, Button, Input } from "@nextui-org/react";

// Icons
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaTags } from "react-icons/fa";

// Interfaces
import { CartCouponsProps } from "@/app/interfaces/cart";

// Helper
import { calculatedDiscount } from "@/app/utils/helpers";

// Data
import { couponsDefaultData } from "@/app/data/coupons";

const CartCoupons: FC<CartCouponsProps> = ({ totalPrice }) => {
  const [appliedCoupon, setAppliedCoupon] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState<number>(0);

  useEffect(() => {
    if (appliedCoupon !== null) {
      setTotalPriceDiscount(calculatedDiscountValue(appliedCoupon, totalPrice));
    }
  }, [totalPrice, appliedCoupon]);

  // Coupon Handler - Apply
  const handleDiscount = (index: number) => {
    if (!checkCouponValidation(index)) {
      return false;
    }
    setAppliedCoupon(index);
    setDiscount(couponsDefaultData[index].discount);
    setTotalPriceDiscount(calculatedDiscountValue(index, totalPrice));
    return true;
  };

  // Coupon Validation - Helper
  const checkCouponValidation = (index: number) => {
    if (!couponsDefaultData[index].active || totalPrice === 0 || couponsDefaultData[index].expired) {
      return false;
    }
    return true;
  }

  // Calculate Discount Value - Helper
  const calculatedDiscountValue = (index: number, totalPrice: number) => {
    const value = calculatedDiscount(couponsDefaultData[index], totalPrice);
    return value;
  }

  // Coupon Handler - Remove
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setTotalPriceDiscount(0);
  };

  // Formik => Validate Coupon - Helper
  const ValidateCoupon = (couponIndex: number) => {
    if (totalPrice === 0) {
      alert("Your cart is empty!");
      return false;
    }
    if (couponIndex === -1) {
      alert("Your coupon is invalid!");
      return false;
    }
    if (!handleDiscount(couponIndex)) {
      alert("Your coupon is expired!");
      return false;
    }
    return true;
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Discount:</p>
        <p className="text-lg">{discount}%</p>
      </div>

      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Total:</p>
        {/* Here place the total with or wothout discount */}
        <p className="text-lg">
          {totalPrice}€
          {appliedCoupon !== null && (
            <>
              <div className="text-sm text-foreground/75">-{discount}% discount</div>
              <div className="text-md text-foreground">{totalPriceDiscount}€</div>
            </>
          )}
        </p>
      </div>

      <hr className="my-4" />
      <p className="text-small mb-4 text-foreground/75 italic">Shipping and taxes will be calculated at checkout</p>

      {/* Coupon Validation */}
      <Formik
        initialValues={{ coupon: "" }}
        validate={(values) => {
          const errors: { coupon?: string } = {};
          if (!values.coupon) {
            errors.coupon = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            const couponIndex = couponsDefaultData.findIndex((coupon) => coupon.code === values.coupon);
            if (ValidateCoupon(couponIndex)) {
              values.coupon = "";
            }
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="grid col-auto gap-4 my-4">
          <Field
            className="col-span-2"
            isRequired
            as={Input}
            id="coupon"
            name="coupon"
            type="text"
            isDisabled={totalPrice === 0}
            radius="sm"
            placeholder="Coupon code"            
            startContent={<FaTags className="text-foreground" />}
            endContent={
              <Button type="submit" size="sm" radius="sm" variant="solid" color="primary" isDisabled={totalPrice === 0}>
                Apply
              </Button>
            }
          />
        </Form>
      </Formik>

      <div className="flex justify-center mb-4">
        <Chip
          className="text-white"
          startContent={appliedCoupon !== null ? <FaRegCircleCheck size={18} /> : null}
          size="sm"
          color="secondary"
          variant="solid"
          onClose={appliedCoupon !== null ? handleRemoveCoupon : undefined}
        >
          {appliedCoupon !== null ? `${couponsDefaultData[appliedCoupon].code} applied` : "No coupon applied"}
        </Chip>
      </div>
    </>
  );
};

export default CartCoupons;
