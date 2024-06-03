// Interfaces
import { AddressObj } from "@interfaces/user";

// Utils
import { generateDefaultAdresses, generateDefaultOrders } from "@utils/helpers";

const defaultUser = {
  id: 0,
  type: "",
  addresses: [],
  orders: [],

  attributes: {
    id: 0,
    firstname: "",
    lastname: "",
    email: "",
    avatar: {
      small: "",
      large: "",
    },
  },
};

const defaultAdress = {
  id: 0,
  label: "",
  firstname: "",
  lastname: "",
  address: "",
  city: "",
  country: "",
  postalCode: "",
  default: false,
} as AddressObj;

export { defaultUser, defaultAdress };
