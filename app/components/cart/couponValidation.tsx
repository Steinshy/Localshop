// React
import { FC } from "react";

// Modules
import { Formik, Form, Field } from "formik";

// NextUI
import { Button, Input } from "@nextui-org/react";

// Icons
import { FaTags } from "react-icons/fa";

// interface
import { CouponValidationProps } from "@interfaces/coupon";

const CouponValidation: FC<CouponValidationProps> = ({ errors, handleSubmit, totalPrice }) => (
  <Formik
    initialValues={{ code: '' }}
    onSubmit={(values) => {
      handleSubmit(values);
      values.code = '';
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
      {errors.code &&
        <div className="text-tiny text-red-400">{errors.code}</div>
      }
    </Form>
  </Formik>
);

export default CouponValidation;
