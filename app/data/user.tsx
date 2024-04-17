// Interfaces
import { UserItemsObj, AddressObj } from "../interfaces/user";

// Utils
import { generateDefaultAdresses, generateDefaultOrders } from "../utils/helpers";

const UserDefaultData = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  addresses: generateDefaultAdresses(),
  orders: generateDefaultOrders(),
} as UserItemsObj;

const UserLoggedOutData = {
  id: 0,
  firstname: "",
  lastname: "",
  email: "",
  addresses: [],
  orders: [],
} as UserItemsObj;

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

export { UserDefaultData, UserLoggedOutData, defaultAdress };
