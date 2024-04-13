// Interfaces
import { CouponsObject } from "../interfaces/cart";

const couponsDefaultData = [
  {
    code: "DISCOUNT10",
    discount: 10,
    active: true,
    expired: false
  },
  {
    code: "DISCOUNT20",
    discount: 20,
    active: true,
    expired: false
  },
  {
    code: "DISCOUNT50",
    discount: 50,
    active: true,
    expired: false
  },
  {
    code: "DISCOUNTEXPIRED",
    discount: 0,
    active: false,
    expired: true
  }
] as CouponsObject[];

export {
  couponsDefaultData
}
