'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interface
import { PagyProps } from '@interfaces/general';
import { ProductResponse } from '@interfaces/product';
import { ErrorObj } from '@interfaces/httpUtils';

// Utils
import { handleError } from '@utils/fetchManager';

// Index
import { api } from '@actions/index';
import { getProductCategoriesProps } from '@interfaces/categories';

// Products - API - BestSellers
export const getBestSellers = async () => {
  revalidateTag('products');

  try {
    const { data } = await api.get<{ data: ProductResponse[] }>(
      '/products/bestsellers',
      { next: { tags: ['products'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as ProductResponse[], error };
  }
};

// Products - API - Newest
export const getNewest = async () => {
  revalidateTag('products');

  try {
    const { data } = await api.get<{ data: ProductResponse[] }>(
      '/products/newest',
      { next: { tags: ['products'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as ProductResponse[], error };
  }
};

// Products - API - LastPieces
export const getLastPieces = async () => {
  revalidateTag('products');

  try {
    const { data } = await api.get<{ data: ProductResponse[] }>(
      '/products/last_pieces',
      { next: { tags: ['products'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as ProductResponse[], error };
  }
};

// Products - API - Get Categories
export const getProductCategories = async () => {
  revalidateTag('categories');

  try {
    const { categories } = await api.get<getProductCategoriesProps>(`/categories`, { next: { tags: ['categories'] } });
    const { data } = categories;
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as ProductResponse[], pagy: { page: 1, pages: 1 } as PagyProps, error };
  }
};

// Products - API - Get
export const getProducts = async (page?: number, query?: string, category?: string) => {
  revalidateTag('products');
  (page = page || 1), (query = query || ''), (category = category || '');

  try {
    const { products, pagy } = await api.get<{ products: { data: ProductResponse[] }; pagy: PagyProps }>(
      `/products?page=${page}&q=${query}&category=${category}`,
      { next: { tags: ['products'] } }
    );
    const { data } = products;
    return { data, pagy };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: [] as ProductResponse[], pagy: { page: 1, pages: 1 } as PagyProps, error };
  }
};

// Product - API - Get
export const getProduct = async (id: string) => {
  try {
    const { data } = await api.get<{ data: ProductResponse }>(`/products/${id}`, { next: { tags: ['product'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as ProductResponse, error };
  }
};
