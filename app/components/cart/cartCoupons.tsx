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
import { CartCouponsProps } from "@interfaces/cart";

// Utils
import http from "@utils/http";

interface Coupon {
  id: string;
  type: string;
  attributes: {
    id: number;
    code: string;
    expiration: string;
    discount: number;
    expired: boolean;
    createdAt: string;
    updatedAt: string
  }
}

interface CouponForm {
  code?: string;
}

const CartCoupons: FC<CartCouponsProps> = ({ totalPrice }) => {
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [totalPriceDiscount, setTotalPriceDiscount] = useState<number>(0);

  useEffect(() => {
    if (appliedCoupon === null) {
      return setTotalPriceDiscount(0);
    }

    const { attributes: { discount } } = appliedCoupon;
    const newPrice = totalPrice - totalPrice * (discount / 100);
    setTotalPriceDiscount(newPrice);
  }, [totalPrice, appliedCoupon]);

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
  };

  const handleSubmit = (values: CouponForm) => {
    const apiFetch = async () => {
      const response = await http.get(`/coupon/${values.code}`);
      const { data } = response.data as { data: Coupon };
      setAppliedCoupon(data);
    }

    void apiFetch();
  }

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
        {/* Here place the total with or wothout discount */}
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
      <Formik
        initialValues={{ code: '' }}
        validate={(values:CouponForm) => {
          const errors:CouponForm = {};
          if (!values.code) {
            errors.code = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setSubmitting(true);
          handleSubmit(values);
          setSubmitting(false);
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
          {appliedCoupon !== null ? `${appliedCoupon.attributes.code} applied` : "No coupon applied"}
        </Chip>
      </div>
    </>
  );
};

export default CartCoupons;
