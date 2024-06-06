// Recat
import { FC } from "react";

// NextUI
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Checkbox,
         Card } from "@nextui-org/react";

// Modules
import { Formik, Form, Field } from "formik";

// Icons
import { FaPlus, FaEdit } from "react-icons/fa";

// Interfaces
import { AddressObj } from "@interfaces/user";

// Utils
import http from "@utils/http";

interface AddressModal {
  addresses: AddressObj[];
  id?: number;
  fetch: () => void;
}

type AddressValues = {
  label: string;
  firstname: string;
  lastname: string;
  phone: number;
  address: string;
  city: string;
  state: string;
  country: string;
  zip: number;
  default: boolean;
}

const defaultAddress = {
  label: '',
  firstname: '',
  lastname: '',
  phone: 0,
  address: '',
  city: '',
  state: '',
  country: '',
  zip: 0,
  default: false
}

const AddressModal: FC<AddressModal> = ({ fetch, addresses, id = 0 }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
  const findAddress = () => {
    const address = addresses.find((obj) => obj.id === id);
    if (address) {
      const { attributes } = address;
      return attributes;
    }
    return defaultAddress;
  }

  const address = id > 0 ? findAddress() : defaultAddress;

  const add = (values: AddressValues) => {
    // Add Request
    const apiFetch = async () => {
      const formData = { address: values }
      await http.post('/addresses', formData);
    }

    void apiFetch();
    fetch();
  };

  const update = (values: AddressValues) => {
    // Update request
    const apiFetch = async () => {
      const formData = { address: values }
      await http.put(`/addresses/${id}`, formData);
    }

    void apiFetch();
    fetch();
  };

  const handleSubmit = (values: AddressValues) => {
    const newAddress = { ...address, ...values };
    id > 0 ? update(newAddress) : add(newAddress);
  };

  return (
    <>
      {id > 0 ? (
        <Button isIconOnly size="sm" onPress={onOpen} variant="flat" color="primary">
          <FaEdit className="text-lg" />
        </Button>
      ) : (
        <Card isPressable onPress={onOpen} className="flex justify-center items-center h-[124px]">
          <h2 className="flex justify-center items-center font-semibold">
            <FaPlus className="mr-1" /> New
          </h2>
        </Card>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{id > 0 ? "Edit" : "Create"} Address</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={address}
                  // validate={(values: AddressAttr) => {
                  //   console.log("validate");
                  //   const errors: { [key: string]: string } = {};
                  //   Object.keys(values).forEach((key) => {
                  //     if (!values[key]) {
                  //       console.log(key);
                  //       errors[key] = "Required";
                  //     }
                  //   });
                  //   // return errors;
                  // }}
                  onSubmit={(values: AddressValues, { setSubmitting }) => {
                    setTimeout(() => {
                      console.log("submit");
                      handleSubmit(values);
                      setSubmitting(false);
                      onClose();
                    }, 400);
                  }}
                >
                  <Form className="grid gap-4 my-4">
                    <Field
                      isRequired
                      as={Input}
                      label="Label"
                      id="label"
                      name="label"
                      type="text"
                      radius="sm"
                      placeholder="Home"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Field
                        isRequired
                        as={Input}
                        className="col-span-1"
                        label="First Name"
                        id="firstname"
                        name="firstname"
                        type="text"
                        radius="sm"
                        placeholder="First Name"
                      />

                      <Field
                        isRequired
                        as={Input}
                        label="Last Name"
                        className="col-span-1"
                        id="lastname"
                        name="lastname"
                        type="text"
                        radius="sm"
                        placeholder="Last Name"
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                      <Field
                        isRequired
                        as={Input}
                        label="Adress"
                        className="col-span-2"
                        id="address"
                        name="address"
                        type="text"
                        radius="sm"
                        placeholder="122 Example St"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <Field
                        isRequired
                        as={Input}
                        label="Country"
                        className="col-span-1"
                        id="country"
                        name="country"
                        type="text"
                        radius="sm"
                        placeholder="USA"
                      />

                      <Field
                        isRequired
                        as={Input}
                        label="City"
                        className="col-span-1"
                        id="city"
                        name="city"
                        type="text"
                        radius="sm"
                        placeholder="Las Vegas"
                      />

                      <Field
                        isRequired
                        as={Input}
                        label="Zip"
                        className="col-span-1"
                        id="zip"

                        name="zip"
                        type="number"
                        radius="sm"
                        placeholder="00000"
                      />
                    </div>

                    <Field
                      as={Checkbox}
                      type="checkbox"
                      id="default"
                      name="default"
                      label="Set as default"
                      className="col-span-1"
                      defaultSelected={address.default || false}
                    >
                      Set as default
                    </Field>

                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        color="primary"
                        variant="solid"
                        className="text-white"
                        size="md"
                        radius="sm"
                      >
                        {id > 0 ? "Confirm Edit" : "Create Address"}
                      </Button>
                    </div>
                  </Form>
                </Formik>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddressModal;
