type UserResponse = {
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

type getUserResponse = {
  data: UserResponse
};

type UserActions = {
  data: UserResponse;
  error?: string;
}

type UserProviderProps = {
  children: React.ReactNode;
  initialUser: UserResponse;
}

type InitialUserProps = {
  initialUser: UserResponse;
}

type loginResponse = {
  userID: number;
}

export type { loginResponse, InitialUserProps, UserProviderProps, UserResponse, getUserResponse, UserActions };
