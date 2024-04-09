"use client";
import { useContext } from "react";
import { Input, Button } from "@nextui-org/react";
import { Formik, Form, Field } from "formik";
import { CiMail } from "react-icons/ci";

import { UserContext } from "../..//utils/subProviders";

export default function Checkout() {
  const userStore = useContext(UserContext);

  const handleSubmit = (values) => {
    console.log("values", values);
  }

  console.log("userStore", userStore);

  return (
    <div className="flex flex-col col-span-1 lg:col-span-2">
      <h1 className="text-center">General information</h1>


      <Formik
        initialValues={{
          address: "",
          city: "",
          country: "",
          postalCode: "",
        }}
        validate={(values) => {
          const errors = {};
          Object.keys(values).forEach((key) => {
            if (!values[key]) {
              errors[key] = "Required";
            }
          });
          return errors;
        }}
            
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            console.log("values", values);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form className="grid col-auto gap-4 my-4">
          <Field
            as={Input}
            className="col-span-2"
            label="First Name"
            id="firstname"
            name="firstname"
            type="text"
            radius="sm"
            isDisabled
            placeholder={userstore.firstname}
          />

          <Field
            isClearable
            as={Input}
            label="Last Name"
            className="col-span-2"
            id="lastname"
            name="lastname"
            type="text"
            radius="sm"
            isDisabled
            placeholder={userstore.lastname}
          />

          <Field
            isClearable
            startContent={<CiMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
            as={Input}
            label="Email"
            className="col-span-2"
            id="email"
            name="email"
            type="text"
            radius="sm"
            isDisabled
            placeholder={userstore.email}
          />

          <div className="flex flex-col col-span-1 lg:col-span-2 gap-4">
            <h1 className="text-center">General information</h1>

            <Field
              isClearable
              as={Input}
              label="Adress"
              className="col-span-2"
              id="address"
              name="street"
              type="text"
              radius="sm"
              isRequired
              placeholder="122 Example St"
            />

            <Field
              isClearable
              as={Input}
              label="Country"
              className="col-span-2"
              id="country"
              name="country"
              type="text"
              radius="sm"
              isRequired
              placeholder="USA"
            />

            <Field
              isClearable
              as={Input}
              label="City"
              className="col-span-2"
              id="city"
              name="city"
              type="text"
              radius="sm"
              isRequired
              placeholder="Las Vegas"
            />

            <Field
              isClearable
              as={Input}
              label="PostalCode"
              className="col-span-2"
              id="postalCode"
              name="postalCode"
              type="text"
              radius="sm"
              placeholder="00000"
            />
          </div>
        </Form>
      </Formik>
      <Button color="success" variant="solid" className="text-white col-span-2" size="lg" radius="sm">
        Save all
      </Button>
    </div>
  );
}
