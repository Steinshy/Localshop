// React
import { FC } from 'react';

// NextUI
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Checkbox } from '@nextui-org/react';

// Icons
import { FaPlus, FaEdit } from 'react-icons/fa';

// Modules
import { Formik, Form, Field } from 'formik';

// Interfaces
import { AddressModalProp, AddressValuesProps } from '@interfaces/userAddress';

// Data
import { defaultAddress } from '@data/general';

const AddressModal: FC<AddressModalProp> = ({ id = 0, addresses, handleCreate, handleUpdate }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const cleanAttributes = (attributes: AddressValuesProps): AddressValuesProps => {
    const unwantedKeys = new Set(['id', 'createdAt', 'updatedAt']);
    return Object.fromEntries(
      Object.entries(attributes).filter(([key]) => !unwantedKeys.has(key))
    ) as AddressValuesProps;
  };

  const findAddress = () => {
    const address = addresses.find((obj) => Number(obj.id) === id);
    if (!address) return defaultAddress;

    const { attributes } = address;
    const newAttributes = { ...attributes };
    return cleanAttributes(newAttributes);
  };
  const formAddress = id > 0 ? findAddress() : defaultAddress;

  const handleSubmit = (values: AddressValuesProps) => {
    const newAddress = { ...formAddress, ...values };
    void (id > 0 ? handleUpdate(id, newAddress) : handleCreate(newAddress));
    onClose(); // Gestion d'erreurs a revoir pour le formulaire
  };

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
              // validate={(values: AddressValuesProps) => {
              //   const errors: { [key: string]: string } = {};
              //   Object.keys(values).forEach((key) => {
              //     if (!values[key as keyof AddressValuesProps]) {
              //       errors[key] = "Required";
              //     }
              //   });
              //   return errors;
              // }}
              onSubmit={(values: AddressValuesProps, { setSubmitting }) => {
                setSubmitting(false);
                try {
                  handleSubmit(values);
                } catch (error) {
                  setSubmitting(false);
                }
              }}
            >
              <Form className='grid gap-4 my-4'>
                <Field
                  label='Label'
                  id='label'
                  name='label'
                  placeholder='Home'
                  type='text'
                  isRequired
                  as={Input}
                  radius='sm'
                />
                <div className='grid grid-cols-2 gap-4'>
                  <Field
                    className='col-span-1'
                    label='First Name'
                    id='firstname'
                    name='firstname'
                    placeholder='First Name'
                    type='text'
                    isRequired
                    as={Input}
                    radius='sm'
                  />

                  <Field
                    label='Last Name'
                    className='col-span-1'
                    id='lastname'
                    name='lastname'
                    placeholder='Last Name'
                    type='text'
                    isRequired
                    as={Input}
                    radius='sm'
                  />
                </div>

                <div className='grid grid-cols-1 gap-4'>
                  <Field
                    label='Adress'
                    className='col-span-2'
                    id='address'
                    name='address'
                    placeholder='122 Example St'
                    type='text'
                    isRequired
                    as={Input}
                    radius='sm'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <Field
                    label='Country'
                    className='col-span-1'
                    id='country'
                    name='country'
                    placeholder='USA'
                    type='text'
                    isRequired
                    as={Input}
                    radius='sm'
                  />

                  <Field
                    label='State'
                    className='col-span-1'
                    id='state'
                    name='state'
                    type='text'
                    placeholder='CA'
                    isRequired
                    as={Input}
                    radius='sm'
                  />
                </div>

                <div className='grid grid-cols-2 gap-4'>
                  <Field
                    label='City'
                    className='col-span-1'
                    id='city'
                    name='city'
                    type='text'
                    placeholder='Las Vegas'
                    isRequired
                    as={Input}
                    radius='sm'
                  />

                  <Field
                    label='Zip'
                    className='col-span-1'
                    id='zip'
                    name='zip'
                    type='number'
                    placeholder='00000'
                    isRequired
                    as={Input}
                    radius='sm'
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
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressModal;
