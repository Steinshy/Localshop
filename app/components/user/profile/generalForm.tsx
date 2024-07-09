'use client';

// React
import { FC, useContext } from "react";

// NextUI
import { Card, CardBody, Input, Button, CardHeader } from "@nextui-org/react";

// Modules
import { Formik, Form, Field } from 'formik';

// Actions
import { updateProfile } from "actions";

// Utils
import { UserContext } from "@utils/subProviders";
import { capitalize, showToast } from "@utils/helpers";

// Interfaces
import { ProfileValuesProps } from "@interfaces/user";

interface FieldsBuilderProps {
  fields: { [key:string]:FieldProps };
  busy: boolean;
  errors: { [key:string]:string };
}

interface FieldProps {
  placeholder?: string;
  type?: string;
}

const FieldsBuilder:FC<FieldsBuilderProps> = ({ fields, busy, errors }) => (
  Object.keys(fields).map((key, index) => (
    <Field
      key={`field_${index}`}
      label={capitalize(key)}
      id={key}
      name={key}
      placeholder={fields[key as keyof FieldProps] ? fields[key].placeholder || capitalize(key) : capitalize(key)}
      type={fields[key as keyof FieldProps] ? fields[key].type || 'text' : 'text'}
      as={Input}
      radius='sm'
      size='sm'
      isDisabled={busy}
      isInvalid={errors[key]}
      color={errors[key] ? 'danger' : 'default'}
      errorMessage={errors[key] && errors[key]}
    />
  ))
);

const GeneralForm = () => {
  const userStore = useContext(UserContext);
  const { update, data: { attributes: { firstname, lastname, email } } } = userStore;

  return (
    <Card>
      <CardHeader>
        General
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            firstname: firstname,
            lastname: lastname,
            email: email
          }}
          validate={(values: ProfileValuesProps) => {
            const errors: { [key: string]: string } = {};
            let hasError:boolean = false;
            Object.keys(values).forEach((key) => {
              if (!values[key as keyof ProfileValuesProps]) {
                hasError = true;
                errors[key] = 'Required';
              }
            });
            if (hasError) return errors;
          }}
          onSubmit={(values:ProfileValuesProps, { setSubmitting, setFieldError }) => {
            setSubmitting(true);
            const apiFetch = async() => {
              const { data, error } = await updateProfile(values);
              if(!error) {
                update(data);
                showToast('Profile Updated!', 'success');
              } else {
                const { items } = error;
                for (const [key, value] of Object.entries(items as { [s: string]: never; })) {
                  setFieldError(key, value[0]);
                }
              }
            }
            void apiFetch();
            setSubmitting(false);
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className='flex flex-col gap-2'>
              <div className='grid grid-cols-2 gap-2'>
                <FieldsBuilder
                  fields={{ firstname: { placeholder: 'John' }, lastname: { placeholder: 'Doe' } }}
                  busy={isSubmitting}
                  errors={errors}
                />
              </div>

              <div>
                <FieldsBuilder
                  fields={{ email: { placeholder: 'email@domain.com', type: 'email' } }}
                  busy={isSubmitting}
                  errors={errors}
                />
              </div>

              <div className='flex justify-center'>
                <Button isLoading={isSubmitting} type='submit' color='primary' variant='solid' className='text-white' size='md' radius='sm'>
                  Save
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
    </Card>
  );
}

export default GeneralForm;
