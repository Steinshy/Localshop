'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interface
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';

// Index
import { api, error } from '@actions/index';

// Products - API - Get
export const getProducts = async (page?: number, query?: string) => {
  revalidateTag('products');
  (page = page || 1), (query = query || '');

  try {
    const { products, pagy } = await api.get<{ products: { data: ProductResponse[] }; pagy: PagyProps }>(
      `/products?page=${page}&q=${query}`,
      { next: { tags: ['products'] } }
    );
    const { data } = products;
    return { data, pagy };
  } catch (e) {
    return { data: [] as ProductResponse[], pagy: { page: 1, pages: 1 } as PagyProps, error };
  }
};

// Product - API - Get
export const getProduct = async (id: string) => {
  try {
    const { data } = await api.get<{ data: ProductResponse }>(`/products/${id}`, { next: { tags: ['product'] } });
    return { data };
  } catch (e) {
    return { data: {} as ProductResponse, error };
  }
};
