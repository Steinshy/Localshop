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

// API
import { applyDiscount, deleteDiscount } from 'actions';

const CartDiscount: FC<CartDiscountProps> = ({ couponCode, couponDiscount = 0, totalPrice = 0 }) => {
  const cartStore = useContext(CartContext);

  const handleApplyDiscount = (value: DiscountFormProps) => {
    if (value.code === undefined && value.code === '') return;
    const apiFetch = async () => {
      try {
        const response = await applyDiscount(value.code);
        const data = response.data;
        cartStore.update(data);
      } catch (error) {
        console.error('An error occurred while fetching applying coupon: ', error);
      }
    };
    void apiFetch();
  };

  const handleDeleteDiscount = () => {
    const apiFetch = async () => {
      try {
        const response = await deleteDiscount();
        const data = response.data;
        cartStore.update(data);
      } catch (error) {
        console.error('An error occurred while fetching applying coupon: ', error);
      }
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
