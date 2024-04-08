import { useState, FC, useEffect } from "react";

// Icons
import { Chip, Button, Input } from "@nextui-org/react";
import { FaRegCircleCheck } from "react-icons/fa6";
// Formik
import { Formik, Form, Field } from "formik";
// utils - interfaces
import { calculatedDiscount, CartCouponsProps, couponsDefaultData, CouponsObject } from "../../../utils/interfaces";

const CartCoupons: FC<CartCouponsProps> = ({ totalPrice, isLoading }) => {
  // Coupons
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
  function checkCouponValidation(index: number) {
    if (!couponsDefaultData[index].active || totalPrice === 0 || couponsDefaultData[index].expired) {
      return false;
    }
    return true;
  }
  // Calculate Discount Value - Helper
  function calculatedDiscountValue(index: number, totalPrice: number) {
    const value = calculatedDiscount(couponsDefaultData[index], totalPrice);
    return value;
  }

  // Coupon Handler - Remove
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setTotalPriceDiscount(0);
  };

  // Fornik => Validate Coupon - Helper
  const ValidateCoupon = (couponIndex: number) => {
    if (totalPrice === 0) {
      alert("Your cart is empty!");
      return false;
    }
    if (couponIndex === -1) {
      // -1 = error
      alert("Your coupon is invalid!");
      return false;
    }
    if (!handleDiscount(couponIndex)) {
      alert("Your coupon is expired!");
      return false;
    }
    return true;
  };

  const ApplyButton = ({ isLoading, totalPrice }: { isLoading: boolean; totalPrice: number }) => (
    <Button
      color="primary"
      variant="solid"
      className="col-span-1"
      type="submit"
      radius="sm"
      size="sm"
      isDisabled={isLoading || totalPrice === 0}
    >
      Apply
    </Button>
  );

  const DeleteButton = ({
    appliedCoupon,
    isloading,
    handleRemoveCoupon,
  }: {
    appliedCoupon: number | null;
    isloading: boolean;
    handleRemoveCoupon: () => void;
  }) => (
    <Button
      color="danger"
      variant="solid"
      className="col-span-1"
      radius="sm"
      size="sm"
      onClick={handleRemoveCoupon}
      isDisabled={isloading || appliedCoupon === null}
    >
      Delete
    </Button>
  );

  const CouponChip = ({
    appliedCoupon,
    couponsDefaultData,
  }: {
    appliedCoupon: number | null;
    couponsDefaultData: CouponsObject[];
  }) => (
    <Chip
      className="text-white justify-self-center col-span-2"
      startContent={appliedCoupon !== null ? <FaRegCircleCheck size={18} /> : null}
      size="sm"
      color="secondary"
      variant="solid"
    >
      {appliedCoupon !== null ? `${couponsDefaultData[appliedCoupon].code} applied` : "No coupon applied"}
    </Chip>
  );

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Discount:</p>
        <p className="text-lg">{discount}%</p>
      </div>

      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Total:</p>
        {/* Here place the total with or wothout discount */}
        <p className="text-lg">
          €{totalPrice}
          {appliedCoupon !== null && (
            <>
              <div className="text-sm text-foreground/75">-{discount}% discount</div>
              <div className="text-md text-foreground">€{totalPriceDiscount}</div>
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
            as={Input}
            className="col-span-2"
            name="coupon"
            type="text"
            isDisabled={isLoading || totalPrice === 0}
            radius="sm"
            isRequired
          />
          <ApplyButton isLoading={isLoading} totalPrice={totalPrice} />
          <DeleteButton appliedCoupon={appliedCoupon} isloading={isLoading} handleRemoveCoupon={handleRemoveCoupon} />
          <CouponChip appliedCoupon={appliedCoupon} couponsDefaultData={couponsDefaultData} />
        </Form>
      </Formik>
    </div>
  );
};

export default CartCoupons;
