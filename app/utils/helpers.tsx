// Interfaces
import { CouponsObject } from "../interfaces/cart";

// Data
import { paymentmethods } from "../data/payment";

/**
 * Generates a slug from a title.
 * @param {string} title The title to generate a slug from.
 * @returns {string} The generated slug.
 */
const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

/**
 * Converts a date to a readable format.
 * @param {string} date The date to convert.
 * @returns {string} The converted date.
 */
const readableDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US').format(new Date(date));
};

/**
 * Generates a random past date.
 * @returns {string} The generated random past date.
 */

const randomPastDate = () => {
  return new Date(Date.now() - Math.floor(Math.random() * (1000 * 60 * 60 * 24 * 365)));
};

/**
 * Generates a random number between two values.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} The generated random number.
 */
const generateRandomNumberBetween = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**
 * Clamps a number between a minimum and maximum value.
 * @param {number} num The number to clamp.
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} The clamped number.
 */
const generateClamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

/**
 * Converts a value to a string.
 * @param {number} value The value to convert.
 * @returns {string} The converted value.
 */
const stringify = (value: number): string => {
  return value.toString();
};

/**
 * Converts a value to rounded number.
 * @param {number} value The value to convert.
 * @returns {number} The converted value.
 */

const round = (value: number): number => {
  return Math.round(value) || 0;
};

/**
 * Generates a random boolean.
 * @returns {boolean} The random boolean.
 */
const generateRandomBool = (): boolean => {
  return Math.random() >= 0.5;
};

/**
 * Calculates the discount based on the selected coupon.
 * @param {CouponsObject} selectedCoupon The selected coupon.
 * @param {number} totalPrice The total price.
 * @returns {number} The calculated discount.
 */
const calculatedDiscount = (selectedCoupon: CouponsObject, totalPrice: number): number => {
  return totalPrice - totalPrice * (selectedCoupon.discount / 100);
};

/**
 Products & Products Search URL
 */

const products_url = (limit: number, skip: number) => {
  return `/products?limit=${limit}&skip=${skip}`;
};

const products_search_url = (limit: number, skip: number, query: string) => {
  return `/products/search?limit=${limit}&skip=${skip}&q=${query}`;
}

/**
 * Generates an array of default addresses.
 * @returns {Array} The array of default addresses.
 */
const generateDefaultAdresses = () => {
  const addresses = [];
  for (let i = 1; i < 6; i++) {
    addresses.push({
      id: i,
      label: `Home ${i}`,
      firstname: "John",
      lastname: "Doe",
      address: "123 Street",
      city: "New York",
      country: "USA",
      postalCode: "12345",
      default: i === 3,
    });
  }
  return addresses;
};

/**
 * Generates an array of default orders.
 * @returns {Array} The array of default orders.
 */
const generateDefaultOrders = () => {
  const orders = [];
  const orderStatus = ["Delivered", "Processing", "Canceled"];

  for (let i = 1; i < 6; i++) {
    orders.push({
      id: i,
      label: `Order ${i}`,
      date: readableDate(randomPastDate().toString()),
      productsTotal: 2,
      status: orderStatus[generateRandomNumberBetween(0, orderStatus.length - 1)],
      paymentType: paymentmethods[generateRandomNumberBetween(0, paymentmethods.length - 1)].label,
      isPaid: true,
      total: 2298,
      products: [
        {
          id: 1,
          title: "iPhone 9",
          price: 549,
          quantity: 2,
          thumbnail: "https://cdn.dummyjson.com/product-images/1/thumbnail.jpg",
        },
        {
          id: 6,
          title: "MacBook Pro",
          price: 1749,
          quantity: 1,
          thumbnail: "https://cdn.dummyjson.com/product-images/6/thumbnail.png",
        },
      ],
    });
  }
  return orders;
};

export {
  generateSlug,
  generateClamp,
  generateRandomBool,
  calculatedDiscount,
  generateDefaultAdresses,
  generateDefaultOrders,
  stringify,
  round,
  generateRandomNumberBetween,
  readableDate,
  products_url,
  products_search_url
};
