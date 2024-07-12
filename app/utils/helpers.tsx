// Modules
import toast, { ToastType } from 'react-hot-toast';

export const readableDate = (date: string): string => {
  return new Intl.DateTimeFormat('en-US').format(new Date(date));
};

export const showToast = (text: string, status: ToastType) => {
  status === 'error' ? toast.error(text) : toast.success(text);
};

export const unslug = (str: string): string => {
  if (str.length === 0) return str;
  return str.replace(/-/g, ' ');
}

export const capitalize = (str: string): string => {
  if (str.length === 0) return str;
  return str.split(' ').map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join(' ');
}

export const isPrivateUrl = (requestUrl: string|undefined): boolean => {
  const privateUrls = ['/user', '/order'];
  const result = privateUrls.some(url => {
    const regex = new RegExp(`^${url}`);
    return requestUrl ? regex.test(requestUrl) : false;
  });
  return result;
}
