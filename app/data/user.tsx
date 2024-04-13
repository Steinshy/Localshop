// Interfaces
import { UserItemsObj } from "../interfaces/user";

// Utils
import { generateDefaultAdresses, generateDefaultOrders } from "../utils/helpers";

const UserDefaultData = {
  id: 1,
  firstname: "John",
  lastname: "Doe",
  email: "john.doe@gmail.com",
  addresses: generateDefaultAdresses(),
  orders: generateDefaultOrders()
} as UserItemsObj;

export {
  UserDefaultData
}
