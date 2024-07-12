'use client';

// React
import { FC } from 'react';

// Modules
import Autocomplete from "react-google-autocomplete";
import { Formik, Form, Field } from 'formik';

// NextUI
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Checkbox } from '@nextui-org/react';

// Icons
import { FaPlus, FaEdit } from 'react-icons/fa';

// Utils
import { ParseGoogleAddress } from '@utils/helpers';

// Interfaces
import { GooglePlaceAddress } from '@interfaces/general';
import { AddressModalProp, AddressValuesProps } from '@interfaces/userAddress';

// Data
import { defaultAddress } from '@data/general';

// Google Places API KEY : AIzaSyB9z4FuD22qYqfKRDvXodNIxm8Y9PaRwYI
const AddressModal: FC<AddressModalProp> = ({ addresses, handleCreate, handleUpdate, id }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const cleanAttributes = (attributes: AddressValuesProps): AddressValuesProps => {
    const unwantedKeys = new Set(['id', 'createdAt', 'updatedAt']);
    return Object.fromEntries(Object.entries(attributes).filter(([key]) => !unwantedKeys.has(key))) as AddressValuesProps;
  };

  const findAddress = () => {
    if (!id) return defaultAddress;
    const address = addresses.find((item) => item.id === id);
    if (!address) return defaultAddress;

    const { attributes } = address;
    const newAttributes = { ...attributes };
    return cleanAttributes(newAttributes);
  };

  const formAddress = id ? findAddress() : defaultAddress;

  return (
    <>
      {id ? (
        <Button isIconOnly size='sm' onPress={onOpen} variant='flat' color='primary'>
          <FaEdit className='text-lg' />
        </Button>
      ) : (
        <Button onPress={onOpen} variant='flat' color='primary'>
          <FaPlus className='mr-1' /> New
        </Button>
      )}
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>{id ? 'Edit Address' : 'Create a new Address'}</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={formAddress}
              validate={(values: AddressValuesProps) => {
                const errors: { [key: string]: string } = {};
                let hasError:boolean = false;
                Object.keys(values).forEach((key) => {
                  if (!values[key as keyof AddressValuesProps]) {
                    if (key === 'default') return;
                    hasError = true;
                    errors[key] = 'Required';
                  }
                });
                if (hasError) return errors;
              }}
              onSubmit={(values: AddressValuesProps, { setSubmitting, setFieldError }) => {
                const newAddress = { ...formAddress, ...values };
                const process = async () => {
                  const response = await (id ? handleUpdate(id, newAddress) : handleCreate(newAddress));
                  setSubmitting(false);
                  if (!response) return onClose();

                  for (const [key, value] of Object.entries(response as { [s: string]: never; })) {
                    setFieldError(key, value[0]);
                  }
                }

                setSubmitting(true);
                void process();
              }}
            >
              {({ errors, isSubmitting, setFieldValue }) => (
                <Form className='grid gap-4 my-4'>
                  <div>
                    <Field
                      label='Label'
                      id='label'
                      name='label'
                      placeholder='Home'
                      type='text'
                      as={Input}
                      radius='sm'
                      isDisabled={isSubmitting}
                      isInvalid={errors.label}
                      color={errors.label ? 'danger' : 'default'}
                      errorMessage={errors.label && errors.label}
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Field
                        className='col-span-1'
                        label='First Name'
                        id='firstname'
                        name='firstname'
                        placeholder='John'
                        type='text'
                        as={Input}
                        radius='sm'
                        isDisabled={isSubmitting}
                        isInvalid={errors.firstname}
                        color={errors.firstname ? 'danger' : 'default'}
                        errorMessage={errors.firstname && errors.firstname}
                      />
                    </div>

                    <div>
                      <Field
                        label='Last Name'
                        className='col-span-1'
                        id='lastname'
                        name='lastname'
                        placeholder='Doe'
                        type='text'
                        as={Input}
                        radius='sm'
                        isDisabled={isSubmitting}
                        isInvalid={errors.lastname}
                        color={errors.lastname ? 'danger' : 'default'}
                        errorMessage={errors.lastname && errors.lastname}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-4'>
                    <div className='group flex flex-col w-full col-span-2 is-filled'>
                      <Autocomplete
                        apiKey='AIzaSyB9z4FuD22qYqfKRDvXodNIxm8Y9PaRwYI'
                        onPlaceSelected={(place: GooglePlaceAddress) => {
                          const address = ParseGoogleAddress(place);
                          void setFieldValue('address', `${address.street_number} ${address.route}`);
                          void setFieldValue('city', address.locality);
                          void setFieldValue('state', address.administrative_area_level_2);
                          void setFieldValue('country', address.country);
                          void setFieldValue('zip', address.postal_code);
                        }}
                        options={{ types: [] }}
                        className='bg-default-100 rounded-lg w-full p-2 m-0'
                      />
                    </div>
                    <Field
                      label='address'
                      className='col-span-2'
                      id='address'
                      name='address'
                      placeholder='122 Example St'
                      type='text'
                      as={Input}
                      radius='sm'
                      isDisabled={isSubmitting}
                      isInvalid={errors.address}
                      color={errors.address ? 'danger' : 'default'}
                      errorMessage={errors.address && errors.address}
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Field
                        label='Country'
                        className='col-span-1'
                        id='country'
                        name='country'
                        placeholder='USA'
                        type='text'
                        as={Input}
                        radius='sm'
                        isDisabled={isSubmitting}
                        isInvalid={errors.country}
                        color={errors.country ? 'danger' : 'default'}
                        errorMessage={errors.country && errors.country}
                      />
                    </div>

                    <div>
                      <Field
                        label='State'
                        className='col-span-1'
                        id='state'
                        name='state'
                        type='text'
                        placeholder='CA'
                        as={Input}
                        radius='sm'
                        isDisabled={isSubmitting}
                        isInvalid={errors.state}
                        color={errors.state ? 'danger' : 'default'}
                        errorMessage={errors.state && errors.state}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <div>
                      <Field
                        label='City'
                        className='col-span-1'
                        id='city'
                        name='city'
                        type='text'
                        placeholder='Las Vegas'
                        as={Input}
                        radius='sm'
                        isDisabled={isSubmitting}
                        isInvalid={errors.city}
                        color={errors.city ? 'danger' : 'default'}
                        errorMessage={errors.city && errors.city}
                      />
                    </div>

                    <div>
                      <Field
                        label='Zip'
                        className='col-span-1'
                        id='zip'
                        name='zip'
                        type='text'
                        placeholder='00000'
                        as={Input}
                        radius='sm'
                        isDisabled={isSubmitting}
                        isInvalid={errors.zip}
                        color={errors.zip ? 'danger' : 'default'}
                        errorMessage={errors.zip && errors.zip}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-4'>
                    <Field
                      label='Phone'
                      className='col-span-1'
                      id='phone'
                      name='phone'
                      type='phone'
                      placeholder='0102030405'
                      as={Input}
                      radius='sm'
                      isDisabled={isSubmitting}
                      isInvalid={errors.phone}
                      color={errors.phone ? 'danger' : 'default'}
                      errorMessage={errors.phone && errors.phone}
                    />
                  </div>

                  <div className='grid grid-cols-2 gap-4'>
                    <Field
                      type='checkbox'
                      id='default'
                      name='default'
                      label='Set as default'
                      className='col-span-1'
                      defaultSelected={formAddress.default || false}
                      as={Checkbox}
                      isDisabled={isSubmitting}
                    >
                      Set as default
                    </Field>
                  </div>

                  <div className='flex justify-center'>
                    <Button isLoading={isSubmitting} type='submit' color='primary' variant='solid' className='text-white' size='md' radius='sm'>
                      {id ? 'Confirm Edit' : 'Create Address'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressModal;
