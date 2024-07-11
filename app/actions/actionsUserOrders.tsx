'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interface
import { OrderResponse } from '@interfaces/userOrder';

// Index
import { api, error } from '@actions/index';



// User => Orders - API - Get (collection)
export const getOrders = async () => {
  revalidateTag('user');
  try {
    const { data } = await api.get<{ data: OrderResponse[] }>('/orders', { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
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
    return { data: {} as OrderResponse, error };
  }
};
