'use server';

// NextJS
import { cookies } from 'next/headers';

// Interface
import { PasswordValuesProps, ProfileValuesProps, UserResponse } from '@interfaces/user';

// Data
import { defaultUser } from '@data/general';

// Index
import { api, error } from '@actions/index';

// User => API - Get
export const getUser = async () => {
  try {
    const { data } = await api.get<{ data: UserResponse }>('/user', { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    return { data: defaultUser, error };
  }
};

// User => API - Login
export const userLogin = async () => {
  try {
    const { userID } = await api.get<{ userID: number }>('/user_login');

    cookies().set({
      name: 'user',
      value: userID.toString(),
      httpOnly: true,
      path: '/',
      sameSite: 'lax',
      domain: '.localshop.test',
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return {};
  } catch (e) {
    return { error };
  }
};

// User => API - Logout
export const userLogout = () => {
  if (!cookies().has('user')) return;

  cookies().set({
    name: 'user',
    value: '',
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    domain: '.localshop.test',
    maxAge: -1,
  });

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
    return { data: defaultUser, error };
  }
};
