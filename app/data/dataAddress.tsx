// Interfaces
import { AddressResponse } from '@interfaces/userAddress';

// Components/user/addressModal | dataCart | dataOrders
export const defaultAddress: AddressResponse = {
  id: '',
  type: '',

  attributes: {
    id: 0,
    label: '',
    firstname: '',
    lastname: '',
    address: '',
    city: '',
    state: '',
    country: '',
    zip: '',
    phone: 0,
    default: false,
    createdAt: '',
    updatedAt: '',
  },
};