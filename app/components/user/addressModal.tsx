// Recat
import { FC } from "react";

// NextUI
import { Input, Button, Modal, ModalContent, ModalHeader, ModalBody, useDisclosure, Checkbox } from "@nextui-org/react";

// Icons
import { FaPlus, FaEdit } from "react-icons/fa";

// Modules
import { Formik, Form, Field } from "formik";

// Interfaces
import { AddressModalProp, AddressValuesProps } from "@interfaces/address";

// Data
import { defaultAddress } from "@data/address";

// Utils
import http from "@utils/http";
import { showToast } from "@utils/helpers";

const AddressModal: FC<AddressModalProp> = ({ fetch, addresses, id = 0 }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const cleanAttributes = (attributes: AddressValuesProps) => {
    const unwantedKeys = ["id", "createdAt", "updatedAt"];
    unwantedKeys.forEach((e: string) => delete attributes[e as keyof AddressValuesProps]);
    return attributes;
  };

  const findAddress = () => {
    const address = addresses.find((obj) => obj.id === id);
    if (address) {
      const { attributes } = address;
      return cleanAttributes(attributes);
    }
    return defaultAddress;
  };
  const address = id > 0 ? findAddress() : defaultAddress;

  const add = (values: AddressValuesProps) => {
    const apiFetch = async () => {
      await http.post("/addresses", { address: values });
      fetch();
      showToast("Address Added!", "success");
      onClose();
    };

    void apiFetch();
  };

  const update = (values: AddressValuesProps) => {
    const apiFetch = async () => {
      await http.put(`/addresses/${id}`, { address: values });
      fetch();
      showToast("Address Updated!", "success");
      onClose();
    };

    void apiFetch();
  };

  const handleSubmit = (values: AddressValuesProps) => {
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
        <Button onPress={onOpen} variant="flat" color="primary">
          <FaPlus className="mr-1" /> New
        </Button>
      )}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">{id > 0 ? "Edit" : "Create"} Address</ModalHeader>
          <ModalBody>
            <Formik
              initialValues={address}
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
                handleSubmit(values);
                setSubmitting(false);
              }}
            >
              <Form className="grid gap-4 my-4">
                <Field
                  label="Label"
                  id="label"
                  name="label"
                  placeholder="Home"
                  type="text"
                  isRequired
                  as={Input}
                  radius="sm"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    className="col-span-1"
                    label="First Name"
                    id="firstname"
                    name="firstname"
                    placeholder="First Name"
                    type="text"
                    isRequired
                    as={Input}
                    radius="sm"
                  />

                  <Field
                    label="Last Name"
                    className="col-span-1"
                    id="lastname"
                    name="lastname"
                    placeholder="Last Name"
                    type="text"
                    isRequired
                    as={Input}
                    radius="sm"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <Field
                    label="Adress"
                    className="col-span-2"
                    id="address"
                    name="address"
                    placeholder="122 Example St"
                    type="text"
                    isRequired
                    as={Input}
                    radius="sm"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Field
                    label="Country"
                    className="col-span-1"
                    id="country"
                    name="country"
                    placeholder="USA"
                    type="text"
                    isRequired
                    as={Input}
                    radius="sm"
                  />

                  <Field
                    label="City"
                    className="col-span-1"
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Las Vegas"
                    isRequired
                    as={Input}
                    radius="sm"
                  />

                  <Field
                    label="Zip"
                    className="col-span-1"
                    id="zip"
                    name="zip"
                    type="number"
                    placeholder="00000"
                    isRequired
                    as={Input}
                    radius="sm"
                  />
                </div>

                <Field
                  type="checkbox"
                  id="default"
                  name="default"
                  label="Set as default"
                  className="col-span-1"
                  defaultSelected={address.default || false}
                  as={Checkbox}
                >
                  Set as default
                </Field>

                <div className="flex justify-center">
                  <Button type="submit" color="primary" variant="solid" className="text-white" size="md" radius="sm">
                    {id > 0 ? "Confirm Edit" : "Create Address"}
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
