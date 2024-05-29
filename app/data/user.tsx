// Interfaces
import { UserItemsObj, AddressObj } from "@interfaces/user";

// Utils
import { generateDefaultAdresses, generateDefaultOrders } from "@utils/helpers";

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

export { defaultAdress };
