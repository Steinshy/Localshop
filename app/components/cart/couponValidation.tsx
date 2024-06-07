// Modules
import { Formik, Form, Field } from "formik";

// NextUI
import { Button, Input } from "@nextui-org/react";

// Icons
import { FaTags } from "react-icons/fa";

// interface

import { CouponForm } from "@interfaces/coupon";

const CouponValidation = ({ handleSubmit, totalPrice }) => {
  return (
    <Formik
      initialValues={{ code: "" }}
      validate={(values: CouponForm) => {
        const errors: CouponForm = {};
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
  );
};

export default CouponValidation;
