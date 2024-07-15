// Modules
import { GoogleAddressObj, GooglePlaceAddress } from '@interfaces/general';
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
};

export const capitalize = (str: string): string => {
  if (str.length === 0) return str;
  return str
    .split(' ')
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export const isPrivateUrl = (requestUrl: string | undefined): boolean => {
  const privateUrls = ['/user', '/order'];
  const result = privateUrls.some((url) => {
    const regex = new RegExp(`^${url}`);
    return requestUrl ? regex.test(requestUrl) : false;
  });
  return result;
};

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
