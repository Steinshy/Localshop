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

export type { UserResponse, getUserResponse, UserActions };
