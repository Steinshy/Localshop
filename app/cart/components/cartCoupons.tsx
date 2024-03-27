import { useState, FC } from "react";
import { Button, Input } from "@nextui-org/react";

import { Chip } from "@nextui-org/react";

// Formik
import { Formik, Form, Field } from "formik";
import { FaRegCircleCheck } from "react-icons/fa6";

import { CartItemProps } from "../../utils/interfaces";

const CartCoupons: FC<CartItemProps> = ({ cart, totalPrice, isLoading }) => {
  // Coupons
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [discount, setDiscount] = useState<number>(0);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState<number>(0);

  // Coupon Handler - Discount
  const handleDiscount = (value: number) => {
    setApplyCoupon(true);
    setDiscount(value);
    const calculatedDiscount = totalPrice - totalPrice * (value / 100);
    setTotalPriceDiscount(calculatedDiscount);
  };
  // Coupon Handler - Remove
  const handleRemoveCoupon = () => {
    setApplyCoupon(false);
    setDiscount(0);
    setTotalPriceDiscount(0);
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Discount:</p>
        <p className="text-lg">%{discount}</p>
      </div>

      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Total:</p>
        {/* Here place the total with or wothout discount */}
        <p className="text-lg">
          €{applyCoupon ? totalPriceDiscount : totalPrice}
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
            if (values.coupon === "UserCoupon1234") {
              handleDiscount(10);
            } else {
              alert("Your Coupon is invalide!");
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
            isDisabled={cart.quantity <= 0 || isLoading}
            radius="sm"
            isRequired
            description="UserCoupon1234 | Is a valid code !"
          />

          <Button
            color="primary"
            variant="solid"
            className="col-span-1"
            type="submit"
            radius="sm"
            size="sm"
            // isDisabled={cart.length <= 0 || isLoading}
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
            isDisabled={!applyCoupon || isLoading}
          >
            Delete
          </Button>

          <Chip
            className="text-white"
            startContent={applyCoupon ? <FaRegCircleCheck size={18} /> : null}
            size="sm"
            color="secondary"
            variant="solid"
          >
            {applyCoupon ? `Coupon ${discount}% applied` : "No coupon applied"}
          </Chip>
        </Form>
      </Formik>
    </div>
  );
};

export default CartCoupons;
