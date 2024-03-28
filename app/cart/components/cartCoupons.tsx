import { useState, FC } from "react";
import { Button, Input } from "@nextui-org/react";

import { Chip } from "@nextui-org/react";

// Formik
import { Formik, Form, Field } from "formik";
import { FaRegCircleCheck } from "react-icons/fa6";

import { CartItemProps } from "../../utils/interfaces";

const coupons = [
  {
    code: "DISCOUNT10",
    discount: 10,
    active: true,
  },
  {
    code: "DISCOUNT20",
    discount: 20,
    active: true,
  },
  {
    code: "DISCOUNT50",
    discount: 50,
    active: true,
  },
  {
    code: "DISCOUNTEXPIRED",
    discount: 0,
    active: false,
  },
];

const CartCoupons: FC<CartItemProps> = ({ totalPrice, isLoading }) => {
  // Coupons
  const [appliedCoupon, setAppliedCoupon] = useState<number | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState<number>(0);

  // Coupon Handler - Discount
  const handleDiscount = (index: number) => {
    const selectedCoupon = coupons[index];
    if (!coupons[index].active) { return false }

    setAppliedCoupon(index);
    setDiscount(selectedCoupon.discount);
    const calculatedDiscount = totalPrice - totalPrice * (selectedCoupon.discount / 100);
    setTotalPriceDiscount(calculatedDiscount);
    return true;
  };

  // Coupon Handler - Remove
  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setTotalPriceDiscount(0);
  };

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
          €{appliedCoupon ? totalPriceDiscount : totalPrice}
        </p>
      </div>

      <hr className="my-4" />
      <p className="text-small mb-4 text-foreground/75 italic">
        Shipping and taxes will be calculated at checkout
      </p>

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
            const couponIndex = coupons.findIndex((coupon) => coupon.code === values.coupon);
            console.log(couponIndex);
            if (couponIndex === -1) {
              alert("Your coupon is invalid!");
            } else {
              if (!handleDiscount(couponIndex)) {
                alert("Your coupon is expired!");
              } else {
                values.coupon = "";
              }
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
            isDisabled={isLoading}
            radius="sm"
            isRequired
          />

          <Button
            color="primary"
            variant="solid"
            className="col-span-1"
            type="submit"
            radius="sm"
            size="sm"
            isDisabled={isLoading}
          >
            Apply
          </Button>
          <Button
            color="danger"
            variant="solid"
            className="col-span-1"
            radius="sm"
            size="sm"
            onClick={handleRemoveCoupon}
            isDisabled={!appliedCoupon || isLoading}
          >
            Delete
          </Button>

          <Chip
            className="text-white"
            startContent={appliedCoupon ? <FaRegCircleCheck size={18} /> : null}
            size="sm"
            color="secondary"
            variant="solid"
          >
            {appliedCoupon ? `${coupons[appliedCoupon].code} applied` : "No coupon applied"}
          </Chip>
        </Form>
      </Formik>
    </div>
  );
};

export default CartCoupons;
