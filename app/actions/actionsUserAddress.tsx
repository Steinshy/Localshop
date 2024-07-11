'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interface
import { AddressResponse, AddressValuesProps } from '@interfaces/userAddress';
import { ErrorObj } from '@interfaces/httpUtils';

// Utils
import { handleError } from '@utils/fetchManager';

// Index
import { api } from '@actions/index';

// User => Address - API - Get
export const getAddresses = async () => {
  revalidateTag('user');
  try {
    const { data } = await api.get<{ data: AddressResponse[] }>('/addresses', { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as AddressResponse[], error };
  }
};

// User => Address - API - Post
export const CreateAddress = async (newAddress: AddressValuesProps) => {
  revalidateTag('user');
  try {
    const { data } = await api.post<{ data: AddressResponse }>('/addresses', JSON.stringify({ address: newAddress }));
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as AddressResponse[], error };
  }
};

// User => Address - API - Put
export const UpdateAddress = async (id: string, newAddress: AddressValuesProps) => {
  revalidateTag('user');
  try {
    const { data } = await api.put<{ data: AddressResponse }>(
      `/addresses/${id}`,
      JSON.stringify({ address: newAddress })
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as AddressResponse[], error };
  }
};

// User => Address - API - Delete
export const RemoveAddress = async (id: string) => {
  revalidateTag('user');
  try {
    await api.delete<void>(`/addresses/${id}`);
    return {};
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { error };
  }
};
