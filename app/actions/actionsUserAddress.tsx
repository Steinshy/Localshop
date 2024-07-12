'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interface
import { PagyProps } from '@interfaces/general';
import { AddressResponse, AddressValuesProps } from '@interfaces/userAddress';
import { ErrorObj } from '@interfaces/httpUtils';

// Utils
import { handleError } from '@utils/fetchManager';

// Index
import { api } from '@actions/index';

// User => Address - API - Get
export const getAddresses = async (page?: number, query?: string) => {
  revalidateTag('user');
  (page = page || 1), (query = query || '');

  try {
    const { addresses, pagy } = await api.get<{ addresses: { data: AddressResponse[] }; pagy: PagyProps }>(`/addresses?page=${page}&q=${query}`, { next: { tags: ['user'] } });
    const { data } = addresses;
    return { data, pagy };
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
