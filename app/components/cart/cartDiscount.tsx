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
import { CartActions } from '@interfaces/cart';
import { CartDiscountProps, DiscountFormProps } from '@interfaces/discount';

// Utils
import { CartContext } from '@utils/subProviders';
import { showToast } from '@utils/helpers';

// API
import { applyDiscount, deleteDiscount } from 'actions';

const CartDiscount: FC<CartDiscountProps> = ({ couponCode, couponDiscount = 0, totalPrice = 0 }) => {
  const cartStore = useContext(CartContext);

  const handleApplyDiscount = (value: DiscountFormProps) => {
    const apiFetch = async () => {
      if (!value.code || value.code.length < 1) return;
      const response = await applyDiscount(value.code) as CartActions;
      const { data, error } = response;
      !error ? cartStore.update(data) : showToast(error, 'error');
    };

    void apiFetch();
  };

  const handleDeleteDiscount = () => {
    const apiFetch = async () => {
      const response = await deleteDiscount() as CartActions;
      const { data, error } = response;
      !error ? cartStore.update(data) : showToast(error, 'error');
    };
    void apiFetch();
  };

  return (
    <>
      <div>
        <h3 className='text-2xl font-semibold mb-4 text-foreground text-center'>Discount</h3>
        <Formik
          initialValues={{ code: '' }}
          onSubmit={(value) => {
            handleApplyDiscount(value);
            value.code = '';
          }}
        >
          <Form className='grid col-auto gap-4 my-4'>
            <Field
              className='col-span-2'
              isRequired
              as={Input}
              id='code'
              name='code'
              type='text'
              radius='sm'
              placeholder='Coupon code'
              startContent={<FaTags className='text-foreground' />}
              isDisabled={totalPrice <= 0}
            />
          </Form>
        </Formik>
      </div>

      {couponCode && (
        <div className='flex justify-center mb-4'>
          <Chip className='text-white' size='sm' color='secondary' variant='solid' onClose={handleDeleteDiscount}>
            Coupon {couponCode} with value of {couponDiscount > 0 ? couponDiscount : 0}% applied
          </Chip>
        </div>
      )}
    </>
  );
};

export default CartDiscount;
