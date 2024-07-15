// actionsUser | dataUser | Interfaces => subProviders | user | userOrder | userProvider
export type UserResponse = {
  id: number;
  type: string;

  attributes: {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    avatar: {
      small: string;
      large: string;
    };
  };
};

// userProvider
export type actionsUser = {
  data: UserResponse;
  error?: string;
};

// actionsUser | generalForm
export type ProfileValuesProps = {
  firstname: string;
  lastname: string;
  email: string;
};

// actionsUser | passwordForm
export type PasswordValuesProps = {
  password: string;
  password_confirmation: string;
};

// generalForm
export type FieldsBuilderProps = {
  fields: { [key: string]: FieldProps };
  busy: boolean;
  errors: { [key: string]: string };
};

// generalForm | Interfaces => user
export type FieldProps = {
  placeholder?: string;
  type?: string;
};
