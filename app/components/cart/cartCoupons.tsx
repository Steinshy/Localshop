"use client";

// React
import { FC, useState } from "react";

// NextUI
import { Chip, Button, Input } from "@nextui-org/react";

import { Formik, Form, Field } from "formik";

// Icons
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaTags } from "react-icons/fa";

// Interfaces
import { CartResponse } from "@interfaces/cart";
import { CartCouponsProps, CouponFormProps } from "@interfaces/coupon";
// Utils
import http from "@utils/http";

const CartCoupons: FC<CartCouponsProps> = ({ discount, coupon, finalPrice, totalPrice, update }) => {
  const [errors, setErrors] = useState<CouponFormProps>({});

  const handleSubmit = (values: CouponFormProps) => {
    const apiFetch = async () => {
      try {
        const response = await http.post("/cart/coupon", { code: values.code });
        const { data } = response.data as { data: CartResponse };
        update(data);
      } catch (error) {
        let message = "Invalid";
        if (error instanceof Error) {
          message = error.message;
        } // A revoir
        setErrors({ code: message });
      }
    };

    setErrors({});
    void apiFetch();
  };

  const handleRemoveCoupon = () => {
    const apiFetch = async () => {
      const response = await http.delete("/cart/clear_coupon");
      const { data } = response.data as { data: CartResponse };
      update(data);
    };

    void apiFetch();
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Discount:</p>
        <p className="text-lg">{discount || 0}%</p>
      </div>
      <hr className="my-4" />
      <div className="grid grid-cols-2 gap-4 text-foreground">
        <p className="text-lg">Total:</p>
        <div className="flex flex-col">
          {coupon !== null ? (
            <>
              <span className="text-lg">{totalPrice}€</span>
              <span className="text-sm text-foreground/75">-{discount}% discount</span>
              <strong>
                <span className="text-lg">{finalPrice}€</span>
              </strong>
            </>
          ) : (
            <strong>{totalPrice}€</strong>
          )}
        </div>
      </div>

      <hr className="my-4" />
      <p className="text-small mb-4 text-foreground/75 italic">Shipping and taxes will be calculated at checkout</p>

      {/* Coupon Validation */}
      <Formik
        initialValues={{ code: "" }}
        onSubmit={(values) => {
          handleSubmit(values);
          values.code = "";
        }}
      >
        <Form className="grid col-auto gap-4 my-4">
          <Field
            className="col-span-2"
            isRequired
            as={Input}
            id="code"
            name="code"
            type="text"
            radius="sm"
            placeholder="Coupon code"
            startContent={<FaTags className="text-foreground" />}
            endContent={
              <Button type="submit" size="sm" radius="sm" variant="solid" color="primary" isDisabled={totalPrice <= 0}>
                Apply
              </Button>
            }
            isDisabled={totalPrice <= 0}
          />
          {errors.code && <div className="text-tiny text-red-400">{errors.code}</div>}
        </Form>
      </Formik>

      {coupon && (
        <div className="flex justify-center mb-4">
          <Chip
            className="text-white"
            startContent={<FaRegCircleCheck size={18} />}
            size="sm"
            color="secondary"
            variant="solid"
            onClose={handleRemoveCoupon}
          >
            Coupon value of {discount}% applied
          </Chip>
        </div>
      )}
    </>
  );
};

export default CartCoupons;
