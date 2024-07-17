// Modules
import { GoogleAddressObj, GooglePlaceAddress } from '@interfaces/general';
import toast, { ToastType } from 'react-hot-toast';

// Toasts
export const showToast = (text: string, status: ToastType) => {
  status === 'error' ? toast.error(text) : toast.success(text);
};

// Turn slugged words into readable format
export const unslug = (str: string): string => {
  if (str.length === 0) return str;
  return str.replace(/-/g, ' ');
};

// Capitalize the first letter of every word
export const capitalize = (str: string): string => {
  if (str.length === 0) return str;
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

// Checks if the user can access the url
export const isPrivateUrl = (requestUrl: string | undefined): boolean => {
  const privateUrls = ['/user', '/order'];
  const result = privateUrls.some((url) => {
    const regex = new RegExp(`^${url}`);
    return requestUrl ? regex.test(requestUrl) : false;
  });
  return result;
};

// Parses Google Places api's result
export const ParseGoogleAddress = (place: GooglePlaceAddress) => {
  const { address_components } = place;
  const addressObj: GoogleAddressObj = {
    street_number: '', // line 1
    route: '', // line 2
    country: '', // country
    administrative_area_level_2: '', // state
    locality: '', // city
    postal_code: '', // zip
  };

  for (let i = 0; i < address_components.length; i++) {
    const { long_name, types } = address_components[i];

    for (let typeI = 0; typeI < types.length; typeI++) {
      if (Object.keys(addressObj).includes(types[typeI])) {
        addressObj[types[typeI] as keyof GoogleAddressObj] = long_name;
      }
    }
  }

  return addressObj;
};
