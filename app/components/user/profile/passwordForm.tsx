'use client';

// React
import { useContext } from "react";

// NextUI
import { Card, CardBody, Input, Button, CardHeader } from "@nextui-org/react";

// Modules
import { Formik, Form, Field } from 'formik';

// Actions
import { updatePassword } from '@actions/actionsUser';

// subProviders
import { UserContext } from '@subProviders/userProvider';

// Utils
import { showToast } from "@utils/helpers";

// Interfaces
import { PasswordValuesProps } from "@interfaces/user";

const PasswordForm = () => {
  const userStore = useContext(UserContext);
  if (!userStore.data) return;
  const { update } = userStore;

  return (
    <Card>
      <CardHeader>
        Password
      </CardHeader>
      <CardBody>
        <Formik
          initialValues={{
            password: '',
            password_confirmation: ''
          }}
          validate={(values: PasswordValuesProps) => {
            const errors: { [key: string]: string } = {};
            let hasError:boolean = false;
            Object.keys(values).forEach((key) => {
              if (!values[key as keyof PasswordValuesProps]) {
                hasError = true;
                errors[key] = 'Required';
              }
            });
            if (hasError) return errors;
          }}
          onSubmit={(values:PasswordValuesProps, { setSubmitting, setFieldError }) => {
            const apiFetch = async() => {
              const { data, error } = await updatePassword(values);
              setSubmitting(false);
              if(!error) {
                Object.keys(values).forEach((key) => { values[key as keyof PasswordValuesProps] = ''; });
                update(data);
                showToast('Password Updated!', 'success');
              } else {
                const { items } = error;
                for (const [key, value] of Object.entries(items as { [s: string]: never; })) {
                  setFieldError(key, value[0]);
                }
              }
            }

            setSubmitting(true);
            void apiFetch();
          }}
        >
          {({ errors, isSubmitting }) => (
            <Form className='flex flex-col gap-2'>
              <div className='grid grid-cols-1 gap-2'>
                <Field
                  label='New Password'
                  id='password'
                  name='password'
                  type='text'
                  as={Input}
                  radius='sm'
                  size='sm'
                  isDisabled={isSubmitting}
                  isInvalid={errors.password}
                  color={errors.password ? 'danger' : 'default'}
                  errorMessage={errors.password && errors.password}
                />

                <Field
                  label='New Password (Confirmation)'
                  id='password_confirmation'
                  name='password_confirmation'
                  type='text'
                  as={Input}
                  radius='sm'
                  size='sm'
                  isDisabled={isSubmitting}
                  isInvalid={errors.password_confirmation}
                  color={errors.password_confirmation ? 'danger' : 'default'}
                  errorMessage={errors.password_confirmation && errors.password_confirmation}
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

export default PasswordForm;
