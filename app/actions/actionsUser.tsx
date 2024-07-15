'use server';

// NextJS
import { cookies } from 'next/headers';

// Interface
import { PasswordValuesProps, ProfileValuesProps, UserResponse } from '@interfaces/user';
import { ErrorObj } from '@interfaces/httpUtils';

// Data
import { defaultUser } from '@data/dataUser';
import { handleError } from '@utils/fetchManager';

// Index
import { api, setCookieLogin, cookiesLogout } from '@actions/index';

// User => API - Get
export const getUser = async () => {
  try {
    const { data } = await api.get<{ data: UserResponse }>('/user', { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: defaultUser, error };
  }
};

// User => API - Login
export const userLogin = async () => {
  try {
    const { userID } = await api.get<{ userID: number }>('/user_login');
    setCookieLogin(userID);
    return {};
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { error };
  }
};

// User => API - Logout
export const userLogout = () => {
  if (!cookies().has('user')) return;
  cookiesLogout();
  return;
};

// User => API - UpdateAvatar
export const updateAvatar = async (formData: FormData) => {
  try {
    const { data } = await api.post<{ data: UserResponse }>('/user/update_picture', formData, {
      next: { tags: ['user'] },
    });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: defaultUser, error };
  }
};

// User => API - UpdateProfile
export const updateProfile = async (profileData: ProfileValuesProps) => {
  try {
    const { data } = await api.patch<{ data: UserResponse }>(
      '/user/update_profile',
      JSON.stringify({ user: profileData }),
      {
        next: { tags: ['user'] },
      }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: defaultUser, error };
  }
};

// User => API - UpdatePassword
export const updatePassword = async (passwordData: PasswordValuesProps) => {
  try {
    const { data } = await api.patch<{ data: UserResponse }>(
      '/user/update_password',
      JSON.stringify({ user: passwordData }),
      {
        next: { tags: ['user'] },
      }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: defaultUser, error };
  }
};
