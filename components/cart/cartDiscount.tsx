'use client';

// React
import { FC, useContext } from 'react';

// Modules
import { Formik, Form, Field } from 'formik';

// NextUI
import { Chip, Input } from '@nextui-org/react';

// Icons
import { FaTags } from 'react-icons/fa';

// Interfaces
import { CartDiscountProps, DiscountFormProps } from '@interfaces/discount';

// Providers
import { CartContext } from '@providers/cartProvider';

// Utils
import { showToast } from '@utils/helpers';

// Actions
import { applyDiscount, deleteDiscount } from '@actions/actionsCart';

const CartDiscount: FC<CartDiscountProps> = () => {
  const cartStore = useContext(CartContext);
  if (!cartStore.data) return;
  const {
    update,
    data: {
      attributes: { totalPrice, coupon }
    }
  } = cartStore;

  const handleDeleteDiscount = () => {
    const apiFetch = async () => {
      const { data, error } = await deleteDiscount();
      !error ? update(data) : showToast(error.message, 'error');
    };
    void apiFetch();
  };

  return (
    <>
      <div>
        <h3 className="text-2xl font-semibold mb-4 text-foreground text-center">Discount</h3>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={(values: DiscountFormProps, { setSubmitting, setFieldError }) => {
            const apiFetch = async () => {
              if (!values.code || values.code.length < 1) return;
              const { data, error } = await applyDiscount(values.code);
              setSubmitting(false);

              if (error) return setFieldError('code', error.message);

              values.code = '';
              update(data);
            };

            setSubmitting(true);
            void apiFetch();
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className="grid col-auto gap-4 my-4">
              <Field
                as={Input}
                id="code"
                name="code"
                type="text"
                radius="sm"
                placeholder="Coupon code"
                startContent={<FaTags className="text-foreground" />}
                isDisabled={totalPrice <= 0 || isSubmitting}
                isInvalid={errors.code}
                color={errors.code ? 'danger' : 'default'}
                errorMessage={errors.code && errors.code}
              />
            </Form>
          )}
        </Formik>
      </div>

      {coupon && (
        <div className="flex justify-center mb-4">
          <Chip className="text-white" size="sm" color="secondary" variant="solid" onClose={handleDeleteDiscount}>
            Coupon {coupon.data.attributes.code} with value of {coupon.data.attributes.discount > 0 ? coupon.data.attributes.discount : 0}% applied
          </Chip>
        </div>
      )}
    </>
  );
};

export default CartDiscount;
