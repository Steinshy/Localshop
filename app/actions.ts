'use server';

// Next Cache
import { revalidateTag } from 'next/cache';

// Interface
import { getUserResponse } from '@interfaces/user';
import { GetOrdersResponse, GetOrderResponse, OrderResponse } from '@interfaces/userOrder';
import { AddressResponse, AddressValuesProps } from '@interfaces/address';
import { getProductsResponse } from '@interfaces/products';
import { ProductResponse } from '@interfaces/product';
import { getReviewResponse } from '@interfaces/reviews';
import { getCartResponse } from '@interfaces/cart';
import { FetchManager } from '@utils/fetchManager';

const base_url = 'http://api.localshop.test:3005/v1';
const api = new FetchManager(base_url);

// User => API - Get
export const getUser = async () => {
  try {
    const { data } = await api.get<getUserResponse>('/user', { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    console.error('An error occurred while fetching user: ', e);
    const error = JSON.stringify(e), data = {};
    return { data, error };
  }
};

// User => Orders - API - Get (collection)
export const getOrders = async () => {
  revalidateTag('user');
  try {
    const { data } = await api.get<GetOrdersResponse>('/orders', { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    console.error('An error occurred while fetching user orders: ', e);
    const error = JSON.stringify(e), data = [] as OrderResponse[];
    return { data, error };
  }
};

// User => Orders - API - Get (single)
export const getOrder = async (id: string) => {
  revalidateTag('user');
  try {
    const { data } = await api.get<GetOrderResponse>(`/orders/${id}`, { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    console.error('An error occurred while fetching user order: ', e);
    const error = JSON.stringify(e), data = {} as OrderResponse;
    return { data, error };
  }
};

// Product => PreviouslyOrdered - API - Get (collection)
export const getPreviouslyOrdered = async (id: string) => {
  revalidateTag('user');
  try {
    const { data } = await api.get<GetOrdersResponse>(`/orders/previously_ordered?product_id=${id}`, { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    console.error('An error occurred while fetching previous orders: ', e);
    const error = JSON.stringify(e), data = [] as OrderResponse[];
    return { data, error };
  }
};

// User => Address - API - Get
export const getAddresses = async () => {
  revalidateTag('user');
  try {
    const { data } = await api.get<{ data: AddressResponse[] }>('/addresses', { next: { tags: ['user'] } });
    return { data };
  } catch (e) {
    console.error('An error occurred while fetching user addresses: ', e);
    const error = JSON.stringify(e), data = [] as AddressResponse[];
    return { data, error };
  }
};

// User => Address - API - Post
export const CreateAddress = async (newAddress: AddressValuesProps) => {
  revalidateTag('user');
  try {
    const { data } = await api.post<{ data: AddressResponse }>('/addresses', JSON.stringify({ address: newAddress }));
    return { data };
  } catch (e) {
    console.error('An error occurred while creating user address: ', e);
    const error = JSON.stringify(e), data = {} as AddressResponse;
    return { data, error };
  }
};

// User => Address - API - Put
export const UpdateAddress = async (id: number, newAddress: AddressValuesProps) => {
  revalidateTag('user');
  try {
    const { data } = await api.put<{ data: AddressResponse }>(`/addresses/${id}`, JSON.stringify({ address: newAddress }));
    return { data };
  } catch (e) {
    console.error('An error occurred while updating user address: ', e);
    const error = JSON.stringify(e), data = {} as AddressResponse;
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
    console.error('An error occurred while deleting user address: ', e);
    const error = JSON.stringify(e);
    return { error };
  }
};

// Products - API - Get
export const getProducts = async (page?: number, query?: string) => {
  revalidateTag('products');
  (page = page || 1), (query = query || '');

  try {
    const { products, pagy } = await api.get<getProductsResponse>(`/products?page=${page}&q=${query}`, { next: { tags: ['products'] } });
    return { products, pagy };
  } catch (error) {
    console.error('An error occurred while fetching products: ', error);
    return { products: { data: [] }, pagy: { page: 0, pages: 0 } };
  }
};

// Product - API - Get
export const getProduct = async (id: string) => {
  try {
    const { data } = await api.get<{ data: ProductResponse }>(`/products/${id}`, { next: { tags: ['product'] } });
    return { data };
  } catch (error) {
    const data = {} as ProductResponse;
    console.error('An error occurred while fetching products: ', error);
    return { data, error };
  }
};

// Product - API - Post - Add To Cart
export const addItemToCart = async (productId: string) => {
  try {
    const data = await api.post<getCartResponse>('/cart/add_item', JSON.stringify({ product_id: productId }));
    return data;
  } catch (error) {
    console.error('An error occurred while adding item to cart: ', error);
    const data = {} as getCartResponse;
    return data;
  }
};

// Product => Review - API - Get
export const getProductReviews = async (value: string) => {
  try {
    const data = await api.get<getReviewResponse>(`/products/${value}/reviews`, { next: { tags: ['reviews'] } });
    return { data };
  } catch (error) {
    const data = {} as getReviewResponse;
    console.error('An error occurred while fetching product reviews: ', error);
    return { data, error };
  }
};

// Cart - API - Get
export const getCart = async () => {
  try {
    const { data } = await api.get<getCartResponse>('/cart', { next: { tags: ['cart'] } });
    return { data };
  } catch (e) {
    console.error('An error occurred while fetching cart: ', e);
    const error = JSON.stringify(e), data = {};
    return { data, error };
  }
};

// Cart - API - Delete - All
export const deleteCart = async () => {
  try {
    const data = await api.delete<getCartResponse>('/cart/clear_items', { next: { tags: ['cart'] } });
    return data;
  } catch (error) {
    console.error('An error occurred while fetching cart: ', error);
    const data = {} as getCartResponse;
    return data;
  }
};

// Cart - API - Delete - One Item
export const deleteCartItem = async (productId: string) => {
  try {
    const data = await api.delete<getCartResponse>(`/cart/remove_item?product_id=${productId}`, { next: { tags: ['cart'] } });
    return data;
  } catch (error) {
    console.error('An error occurred while fetching cart: ', error);
    const data = {} as getCartResponse;
    return data;
  }
};

// Cart - API - Post - Update Quantity
export const updateQuantity = async (quantity: string, productId: string) => {
  try {
    const data = await api.post<getCartResponse>(
      '/cart/update_quantity',
      JSON.stringify({ product_id: productId, quantity: quantity }),
      { next: { tags: ['cart'] } }
    );
    return data;
  } catch (error) {
    console.error('An error occurred while fetching cart: ', error);
    const data = {} as getCartResponse;
    return data;
  }
};

// Cart => Discount - API - Post
export const applyDiscount = async (value: string) => {
  try {
    const data = await api.post<getCartResponse>(
      '/cart/apply_coupon',
      JSON.stringify({ code: value }),
      { next: { tags: ['cart'] } }
    );
    return data;

  } catch (error) {
    console.error('An error occurred while fetching coupon: ', error);
    return error;
  }
};

// Cart => Discount - API - Delete
export const deleteDiscount = async () => {
  try {
    const data = await api.delete<getCartResponse>('/cart/clear_coupon', { next: { tags: ['cart'] } });
    return data;
  } catch (error) {
    console.error('An error occurred while removing coupon: ', error);
    const data = {} as getCartResponse;
    return data;
  }
};
