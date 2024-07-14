'use server';

// NextJS
import { revalidateTag } from 'next/cache';

// Interface
import { CartResponse } from '@interfaces/cart';
import { ErrorObj } from '@interfaces/httpUtils';
import { OrderResponse } from '@interfaces/userOrder';

// Data
import { defaultCart } from '@data/general';

// Utils
import { handleError } from '@utils/fetchManager';

// Index
import { api } from '@actions/index';

// Cart - API - Get
export const getCart = async () => {
  revalidateTag('cart');
  try {
    const { data } = await api.get<{ data: CartResponse }>('/cart', { next: { tags: ['cart'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: defaultCart, error };
  }
};

// Cart - API - Delete - All
export const deleteCart = async () => {
  revalidateTag('cart');
  try {
    const { data } = await api.delete<{ data: CartResponse }>(
      '/cart/clear_items',
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as { data: CartResponse }, error };
  }
};

// Cart - API - Delete - One Item
export const deleteCartItem = async (productId: string) => {
  revalidateTag('cart');
  try {
    const { data } = await api.delete<{ data: CartResponse }>(
      `/cart/remove_item?product_id=${productId}`,
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as { data: CartResponse }, error };
  }
};

// Cart - API - Post - Update Quantity
export const updateQuantity = async (quantity: number, productId: string) => {
  revalidateTag('cart');
  try {
    const { data } = await api.post<{ data: CartResponse }>(
      '/cart/update_quantity',
      JSON.stringify({ product_id: productId, quantity: quantity }),
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as { data: CartResponse }, error };
  }
};

// Cart => Discount - API - Post
export const applyDiscount = async (value: string) => {
  revalidateTag('cart');
  try {
    const { data } = await api.post<{ data: CartResponse }>(
      '/cart/apply_coupon',
      JSON.stringify({ code: value }),
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {}, error };
  }
};

// Cart => Discount - API - Delete
export const deleteDiscount = async () => {
  revalidateTag('cart');
  try {
    const { data } = await api.delete<{ data: CartResponse }>('/cart/clear_coupon', { next: { tags: ['cart'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as { data: CartResponse }, error };
  }
};

// Product - API - Post - Add To Cart
export const addItemToCart = async (productId: string) => {
  revalidateTag('cart');
  try {
    const { data } = await api.post<{ data: CartResponse }>(
      '/cart/add_item',
      JSON.stringify({ product_id: productId }),
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {} as { data: CartResponse }, error };
  }
};

// Cart => Addresses - API - Post
export const addAddresses = async (addressID: string, purpose: number) => {
  revalidateTag('cart');
  try {
    const { data } = await api.post<{ data: CartResponse }>(
      '/cart/add_addresses',
      JSON.stringify({ address_id: addressID, address_purpose: purpose }),
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {}, error };
  }
};

// Cart => Addresses - API - Post
export const removeAddresses = async (addressID: string, purpose: number) => {
  revalidateTag('cart');
  try {
    const { data } = await api.post<{ data: CartResponse }>(
      '/cart/remove_addresses',
      JSON.stringify({ address_id: addressID, address_purpose: purpose }),
      { next: { tags: ['cart'] } }
    );
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {}, error };
  }
};

// Cart => Orders - API - Post
export const placeOrder = async () => {
  revalidateTag('orders');
  try {
    const { data } = await api.post<{ data: OrderResponse }>(
      '/orders',
      null,
      { next: { tags: ['orders'] } });
    return { data };
  } catch (e) {
    const error = handleError(e as Error | ErrorObj | string);
    return { data: {}, error };
  }
};
