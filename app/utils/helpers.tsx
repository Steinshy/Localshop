// Modules
import toast, { ToastType } from 'react-hot-toast';

/**
 * Converts a date to a readable format.
 * @param {string} date The date to convert.
 * @returns {string} The converted date.
 */
const readableDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US').format(new Date(date));
};

const showToast = (text: string, status: ToastType) => {
  status === 'error' ? toast.error(text) : toast.success(text);
};

const capitalize = (str: string): string => {
  if (str.length === 0) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export { capitalize, readableDate, showToast };
