// Interfaces
import { UserResponse } from '@interfaces/user';

// Utils/subProviders
export const defaultUser: UserResponse = {
  id: 0,
  type: '',

  attributes: {
    id: 0,
    firstname: '',
    lastname: '',
    email: '',
    avatar: {
      small: '',
      large: '',
    },
  },
};