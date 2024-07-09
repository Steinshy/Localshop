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

// Utils
import { CartContext } from '@utils/subProviders';
import { showToast } from '@utils/helpers';

// API
import { applyDiscount, deleteDiscount } from 'actions';

const CartDiscount: FC<CartDiscountProps> = () => {
  const cartStore = useContext(CartContext);

  const { update, data: { attributes: { totalPrice, coupon } } } = cartStore;
  const { data: { attributes: { code, discount } } } = coupon || { data: { attributes: { code: undefined, discount: undefined } } };

  const handleDeleteDiscount = () => {
    const apiFetch = async () => {
      const response = await deleteDiscount();
      const { data, error } = response;
      !error ? update(data) : showToast(error.message, 'error');
    };
    void apiFetch();
  };

  return (
    <>
      <div>
        <h3 className='text-2xl font-semibold mb-4 text-foreground text-center'>Discount</h3>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={(values: DiscountFormProps, { setSubmitting, setFieldError }) => {
            setSubmitting(true);

            const apiFetch = async () => {
              if (!values.code || values.code.length < 1) return;
              const { data, error } = await applyDiscount(values.code);

              setSubmitting(false);
              if (error) return setFieldError('code', error.message);
              
              values.code = '';
              cartStore.update(data);
            };
        
            void apiFetch();
          }}
        >
          {({ errors }) => (
            <Form className='grid col-auto gap-4 my-4'>
              <Field
                as={Input}
                id='code'
                name='code'
                type='text'
                radius='sm'
                placeholder='Coupon code'
                startContent={<FaTags className='text-foreground' />}
                isDisabled={totalPrice <= 0}
                isInvalid={errors.code}
                color={errors.code ? 'danger' : 'default'}
                errorMessage={errors.code && errors.code}
              />
            </Form>
          )}
        </Formik>
      </div>

      {code && (
        <div className='flex justify-center mb-4'>
          <Chip className='text-white' size='sm' color='secondary' variant='solid' onClose={handleDeleteDiscount}>
            Coupon {code} with value of {discount > 0 ? discount : 0}% applied
          </Chip>
        </div>
      )}
    </>
  );
};

export default CartDiscount;
