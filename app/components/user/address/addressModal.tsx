'use client';

// React
import { FC } from 'react';

// NextUI
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Checkbox } from '@nextui-org/react';

// Icons
import { FaPlus, FaEdit } from 'react-icons/fa';

// Modules
import { Formik, Form, Field } from 'formik';

// Interfaces
import { AddressModalProp, AddressValuesProps } from '@interfaces/address';

// Data
import { defaultAddress } from '@data/general';

const AddressModal: FC<AddressModalProp> = ({ id = 0, addresses, handleCreate, handleUpdate }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const cleanAttributes = (attributes: AddressValuesProps): AddressValuesProps => {
    const unwantedKeys = new Set(['id', 'createdAt', 'updatedAt']);
    return Object.fromEntries(Object.entries(attributes).filter(([key]) => !unwantedKeys.has(key))) as AddressValuesProps;
  };

  const findAddress = () => {
    const address = addresses.find((obj) => Number(obj.id) === id);
    if (!address) return defaultAddress;

    const { attributes } = address;
    const newAttributes = { ...attributes };
    return cleanAttributes(newAttributes);
  };

  const formAddress = id > 0 ? findAddress() : defaultAddress;

  return (
    <>
      {id > 0 ? (
        <Button isIconOnly size='sm' onPress={onOpen} variant='flat' color='primary'>
          <FaEdit className='text-lg' />
        </Button>
      ) : (
        <Button onPress={onOpen} variant='flat' color='primary'>
          <FaPlus className='mr-1' /> New
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>{id > 0 ? 'Edit Address' : 'Create a new Address'}</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={formAddress}
              validate={(values: AddressValuesProps) => {
                const errors: { [key: string]: string } = {};
                let hasError:boolean = false;
                Object.keys(values).forEach((key) => {
                  if (!values[key as keyof AddressValuesProps]) {
                    if (key === 'zip' || key === 'default') return;
                    hasError = true;
                    errors[key] = 'Required';
                  }
                });
                console.log(hasError);
                console.log(errors);
                if (hasError) return errors;
              }}
              onSubmit={(values: AddressValuesProps, { setSubmitting, setFieldError }) => {
                setSubmitting(true);
                const newAddress = { ...formAddress, ...values };

                const process = async () => {
                  const response = await (id > 0 ? handleUpdate(id, newAddress) : handleCreate(newAddress));
                  if (!response) return onClose();

                  for (const [key, value] of Object.entries(response as { [s: string]: never; })) {
                    setFieldError(key, value[0]);
                  }
                }

                void process();
                setSubmitting(false);
              }}
            >
              {({ errors }) => (
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
                        isInvalid={errors.lastname}
                        color={errors.lastname ? 'danger' : 'default'}
                        errorMessage={errors.lastname && errors.lastname}
                      />
                    </div>
                  </div>

                  <div className='grid grid-cols-1 gap-4'>
                    <div>
                      <Field
                        label='Adress'
                        className='col-span-2'
                        id='address'
                        name='address'
                        placeholder='122 Example St'
                        type='text'
                        as={Input}
                        radius='sm'
                        isInvalid={errors.address}
                        color={errors.address ? 'danger' : 'default'}
                        errorMessage={errors.address && errors.address}
                      />
                    </div>
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
                        type='number'
                        placeholder='00000'
                        as={Input}
                        radius='sm'
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
                      placeholder={0}
                      as={Input}
                      radius='sm'
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
                    >
                      Set as default
                    </Field>
                  </div>

                  <div className='flex justify-center'>
                    <Button type='submit' color='primary' variant='solid' className='text-white' size='md' radius='sm'>
                      {id > 0 ? 'Confirm Edit' : 'Create Address'}
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
