'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interface
import { OrderResponse } from '@interfaces/userOrder';
import { ErrorObj } from '@interfaces/httpUtils';

// Utils
import { handleError } from '@utils/fetchManager';

// Index
import { api } from '@actions/index';
import { PagyProps } from '@interfaces/general';

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

// Product => PreviouslyOrdered - API - Get (collection)
export const getPreviouslyOrdered = async (id: string) => {
  revalidateTag('user');
  try {
    const { data } = await api.get<{ data: OrderResponse[] }>(`/orders/previously_ordered?product_id=${id}`, {
      next: { tags: ['user'] },
    });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as OrderResponse, error };
  }
};
