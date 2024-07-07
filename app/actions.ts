'use server';

// Next Cache
import { revalidateTag } from 'next/cache';

// Interface
import { getUserResponse } from '@interfaces/user';
import { GetOrdersResponse, GetOrderResponse, OrderResponse } from '@interfaces/userOrder';
import { AddressResponse, AddressValuesProps } from '@interfaces/userAddress';
import { getProductsResponse } from '@interfaces/products';
import { ProductResponse } from '@interfaces/product';
import { getReviewResponse } from '@interfaces/reviews';
import { getCartResponse } from '@interfaces/cart';
import { ErrorObj } from '@interfaces/general';

// Utils
import { FetchManager, handleError } from '@utils/fetchManager';

const base_url = 'http://api.localshop.test:3005/v1';
const api = new FetchManager(base_url);

// User => API - Get
export const getUser = async () => {
  try {
    const { data } = await api.get<getUserResponse>('/user',
      { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {};
    return { data, error };
  }
};

// User => Orders - API - Get (collection)
export const getOrders = async () => {
  revalidateTag('user');
  try {
    const { data } = await api.get<GetOrdersResponse>('/orders',
      { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = [] as OrderResponse[];
    return { data, error };
  }
};

// User => Orders - API - Get (single)
export const getOrder = async (id: string) => {
  revalidateTag('user');
  try {
    const { data } = await api.get<GetOrderResponse>(`/orders/${id}`,
      { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as OrderResponse;
    return { data, error };
  }
};

// Product => PreviouslyOrdered - API - Get (collection)
export const getPreviouslyOrdered = async (id: string) => {
  revalidateTag('user');
  try {
    const { data } = await api.get<GetOrdersResponse>(`/orders/previously_ordered?product_id=${id}`, {
      next: { tags: ['user'] },
    });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = [] as OrderResponse[];
    return { data, error };
  }
};

// User => Address - API - Get
export const getAddresses = async () => {
  revalidateTag('user');
  try {
    const { data } = await api.get<{ data: AddressResponse[] }>('/addresses',
      { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = [] as AddressResponse[];
    return { data, error };
  }
};

// User => Address - API - Post
export const CreateAddress = async (newAddress: AddressValuesProps) => {
  revalidateTag('user');
  try {
    const { data } = await api.post<{ data: AddressResponse }>('/addresses',
      JSON.stringify({ address: newAddress }));
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as AddressResponse;
    return { data, error };
  }
};

// User => Address - API - Put
export const UpdateAddress = async (id: number, newAddress: AddressValuesProps) => {
  revalidateTag('user');
  try {
    const { data } = await api.put<{ data: AddressResponse }>(`/addresses/${id}`,
      JSON.stringify({ address: newAddress })
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as AddressResponse;
    return { data, error };
  }
};

// User => Address - API - Delete
export const RemoveAddress = async (id: number) => {
  revalidateTag('user');
  try {
    await api.delete<void>(`/addresses/${id}`);
    return {};
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string);
    return { error };
  }
};

// Products - API - Get
export const getProducts = async (page?: number, query?: string) => {
  revalidateTag('products');
  (page = page || 1), (query = query || '');

  try {
    const { products, pagy } = await api.get<getProductsResponse>(`/products?page=${page}&q=${query}`, {
      next: { tags: ['products'] },
    });
    return { products, pagy };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {};
    return { data, error };
  }
};

// Product - API - Get
export const getProduct = async (id: string) => {
  try {
    const { data } = await api.get<{ data: ProductResponse }>(`/products/${id}`,
      { next: { tags: ['product'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as ProductResponse;
    return { data, error };
  }
};

// Product - API - Post - Add To Cart
export const addItemToCart = async (productId: string) => {
  try {
    const { data } = await api.post<getCartResponse>('/cart/add_item',
      JSON.stringify({ product_id: productId }));
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as getCartResponse;
    return { data, error };
  }
};

// Product => Review - API - Get
export const getProductReviews = async (value: string) => {
  try {
    const data = await api.get<getReviewResponse>(`/products/${value}/reviews`,
      { next: { tags: ['reviews'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as getReviewResponse;
    return { data, error };
  }
};

// Cart - API - Get
export const getCart = async () => {
  try {
    const { data } = await api.get<getCartResponse>('/cart',
      { next: { tags: ['cart'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {};
    return { data, error };
  }
};

// Cart - API - Delete - All
export const deleteCart = async () => {
  try {
    const { data } = await api.delete<getCartResponse>('/cart/clear_items',
      { next: { tags: ['cart'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as getCartResponse;
    return { data, error };
  }
};

// Cart - API - Delete - One Item
export const deleteCartItem = async (productId: string) => {
  try {
    const { data } = await api.delete<getCartResponse>(`/cart/remove_item?product_id=${productId}`, {
      next: { tags: ['cart'] },
    });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as getCartResponse;
    return { data, error };
  }
};

// Cart - API - Post - Update Quantity
export const updateQuantity = async (quantity: number, productId: string) => {
  try {
    const { data } = await api.post<getCartResponse>('/cart/update_quantity',
      JSON.stringify({ product_id: productId, quantity: quantity }),
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as getCartResponse;
    return { data, error };
  }
};

// Cart => Discount - API - Post
export const applyDiscount = async (value: string) => {
  try {
    const { data } = await api.post<getCartResponse>(
      '/cart/apply_coupon',
      JSON.stringify({ code: value }),
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {};
    return { data, error };
  }
};

// Cart => Discount - API - Delete
export const deleteDiscount = async () => {
  try {
    const { data } = await api.delete<getCartResponse>('/cart/clear_coupon', { next: { tags: ['cart'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error|ErrorObj|string), data = {} as getCartResponse;
    return { data, error };
  }
};
