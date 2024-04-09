"use client";

import { useContext } from "react";
import { Input, Button, Divider } from "@nextui-org/react";
import { Formik, Form, Field } from "formik";

import { UserContext } from "../..//utils/subProviders";

const defaultAdress = {
  firstname: "",
  lastname: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
};

export default function Checkout() {
  const userStore = useContext(UserContext);
  const { update } = userStore;
  const { addresses } = userStore.user;
  const address = addresses[0] || defaultAdress;

  const handleSubmit = (values: { [key: string]: string }) => {
    console.log("values", values);
    const newAddress = { ...address, ...values };
    update({ ...userStore.user, addresses: [newAddress] });
  }

  return (
    <div className="flex flex-col col-span-1 lg:col-span-2">
      <div className="flex flex-col col-span-1 lg:col-span-2">
        <h2 className="text-xl">Shipping Address</h2>

        <Formik
          initialValues={address}
          validate={(values: { [key: string]: string }) => {
            const errors: { [key: string]: string } = {};
            Object.keys(values).forEach((key) => {
              if (!values[key]) {
                errors[key] = "Required";
              }
            });
            return errors;
          }}
              
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleSubmit(values);
              console.log("values", values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="grid gap-4 my-4">
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

            <div className="flex justify-center">
              <Button type="submit" color="primary" variant="solid" className="text-white" size="md" radius="sm">
                Save
              </Button>
            </div>
          </Form>
        </Formik>
      </div>

      <Divider className="my-2" />

      <div className="flex flex-col col-span-1 lg:col-span-2">
        <h2 className="text-xl">Billing Address</h2>

        <Formik
          initialValues={address}
          validate={(values: { [key: string]: string }) => {
            const errors: { [key: string]: string } = {};
            Object.keys(values).forEach((key) => {
              if (!values[key]) {
                errors[key] = "Required";
              }
            });
            return errors;
          }}
              
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              handleSubmit(values);
              console.log("values", values);
              setSubmitting(false);
            }, 400);
          }}
        >
          <Form className="grid gap-4 my-4">
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

            <div className="flex justify-center">
              <Button type="submit" color="primary" variant="solid" className="text-white" size="md" radius="sm">
                Save
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
