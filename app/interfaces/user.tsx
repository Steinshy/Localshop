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

export type UserActions = {
  data: UserResponse;
  error?: string;
};

export type UserProviderProps = {
  children: React.ReactNode;
  initialUser: UserResponse;
};

export type InitialUserProps = {
  initialUser: UserResponse;
};

export type ProfileValuesProps = {
  firstname: string;
  lastname: string;
  email: string;
};

export type PasswordValuesProps = {
  password: string;
  password_confirmation: string;
};
