// Recat
import { FC, useContext } from "react";

// NextUI
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Checkbox,
  Card,
} from "@nextui-org/react";

// Modules
import { Formik, Form, Field } from "formik";
import { FaPlus, FaEdit } from "react-icons/fa";

// Utils
import { UserContext } from "../..//utils/subProviders";

// Interfaces
import { AddressObj } from "../../utils/interfaces";

const defaultAdress = {
  id: 0,
  label: "",
  firstname: "",
  lastname: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  default: false,
};

const AddressModal: FC<{ id?: number }> = ({ id = 0 }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const userStore = useContext(UserContext);
  const { update } = userStore;
  const { addresses } = userStore.user;
  const address = addresses.find((obj) => obj.id === id) || defaultAdress;

  const addAddress = (values: AddressObj) => {
    const newAddress = { ...address, ...values, id: addresses.length + 1 };
    update({ ...userStore.user, addresses: [newAddress, ...addresses] });
  };

  const editaddAddress = (values: AddressObj) => {
    const newAddress = { ...address, ...values };
    const index = addresses.findIndex((obj) => obj.id === id);
    if (newAddress.default == true) {
      addresses.forEach((obj) => (obj.default = false));
    }
    addresses[index] = newAddress;
    update({ ...userStore.user, addresses });
  };

  const handleSubmit = (values: AddressObj) => {
    const newAddress = { ...address, ...values };
    id > 0 ? editaddAddress(newAddress) : addAddress(newAddress);
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
              <ModalHeader className="flex flex-col gap-1">{id > 0 ? "Edit" : "Add"} Address</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={address}
                  validate={(values: AddressObj) => {
                    console.log("validate");
                    const errors: { [key: string]: string } = {};
                    Object.keys(values).forEach((key) => {
                      if (!values[key]) {
                        console.log(key);
                        errors[key] = "Required";
                      }
                    });
                    // return errors;
                  }}
                  onSubmit={(values: AddressObj, { setSubmitting }) => {
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
                        label="PostalCode"
                        className="col-span-1"
                        id="postalCode"
                        name="postalCode"
                        type="text"
                        radius="sm"
                        placeholder="00000"
                      />
                    </div>

                    {/* Set default */}
                    <Field
                      as={Checkbox}
                      type="checkbox"
                      id="default"
                      name="default"
                      label="Set as default"
                      className="col-span-1"
                      defaultChecked={address.default}
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
                        {id > 0 ? "Edit" : "Add"}
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
