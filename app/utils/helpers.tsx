// Modules
import toast, { ToastType } from 'react-hot-toast';

/**
 * Generates a slug from a title.
 * @param {string} title The title to generate a slug from.
 * @returns {string} The generated slug.
 */
const generateSlug = (title: string): string => {
  if (!title) return '';
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
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
 * Generates a random boolean.
 * @returns {boolean} The random boolean.
 */
const generateRandomBool = (): boolean => {
  return Math.random() >= 0.5;
};

const showToast = (text: string, status: ToastType) => {
  status === 'error' ? toast.error(text) : toast.success(text);
};

export { generateSlug, generateClamp, generateRandomBool, readableDate, showToast };
