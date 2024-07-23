'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interfaces
import { OrderResponse } from '@interfaces/userOrder';
import { ErrorObj } from '@interfaces/httpUtils';
import { PagyProps } from '@interfaces/general';

// Utils
import { handleError } from '@utils/fetchManager';

// Index
import { api } from '@actions/index';

// User => Orders - API - Get (collection)
export const getOrders = async (page?: number, query?: string) => {
  revalidateTag('user');
  (page = page || 1), (query = query || '');

  try {
    const { orders, pagy } = await api.get<{ orders: { data: OrderResponse[] }; pagy: PagyProps }>(`/orders?page=${page}&q=${query}`, { next: { tags: ['user'] } });
    const { data } = orders;
    return { data, pagy };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as OrderResponse[], error };
  }
};

// User => Orders - API - Get (single)
export const getOrder = async (id: string) => {
  revalidateTag('user');
  try {
    const { data } = await api.get<{ data: OrderResponse }>(`/orders/${id}`, { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as OrderResponse, error };
  }
};
