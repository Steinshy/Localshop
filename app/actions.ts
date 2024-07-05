'use server';

// Next Cache
import { revalidateTag } from 'next/cache';

// Interface
import { getUserResponse } from '@interfaces/user';
import { AddressResponse, AddressValuesProps } from '@interfaces/address';
import { getProductsResponse } from '@interfaces/products';
import { getProductResponse } from '@interfaces/product';
import { getReviewResponse } from '@interfaces/reviews';
import { getCartResponse } from '@interfaces/cart';
import { OrderResponse } from '@interfaces/orders';


// User => API - Get
export const getUser = async () => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { tags: ['user'] },
    });

    const { data } = await response.json() as getUserResponse;
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
  const response = await fetch('http://api.localshop.test:3005/v1/orders', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { tags: ['user'] } 
  });
  const data = await response.json() as { data: OrderResponse[] };
  const { data: orders } = data;
  return orders;
};

// User => Orders - API - Get (single)
export const getOrder = async (id: string) => {
  revalidateTag('user');
  const response = await fetch(`http://api.localshop.test:3005/v1/orders/${id}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { tags: ['user'] } 
  });
  const { data } = await response.json() as { data: OrderResponse };
  return data;
};

// User => Address - API - Get
export const getAddresses = async () => {
  revalidateTag('user');
  const response = await fetch('http://api.localshop.test:3005/v1/addresses', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    next: { tags: ['user'] } 
  });
  const data = await response.json() as { data: AddressResponse[] };
  const { data: addresses } = data;
  return addresses;
};

// User => Address - API - Post
export const CreateAddress = async (newAddress: AddressValuesProps) => {
  revalidateTag('user');
  await fetch('http://api.localshop.test:3005/v1/addresses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: newAddress }),
  });
  return getAddresses();
};

// User => Address - API - Put
export const UpdateAddress = async (id: number, newAddress: AddressValuesProps) => {
  revalidateTag('user');
  await fetch(`http://api.localshop.test:3005/v1/addresses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: newAddress }),
  });
  return getAddresses();
};

// User => Address - API - Delete
export const RemoveAddress = async (id: number) => {
  revalidateTag('user');
  await fetch(`http://api.localshop.test:3005/v1/addresses/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({ id }),
  });
  return getAddresses();
};

// Products - API - Get
export const getProducts = async (page?: number, query?: string) => {
  revalidateTag('products');
  (page = page || 1), (query = query || '');

  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/products?page=${page}&q=${query}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { tags: ['products'] },
    });
    const { products, pagy } = await response.json() as getProductsResponse;
    return { products, pagy };
  } catch (error) {
    console.error('An error occurred while fetching products: ', error);
    return { products: { data: [] }, pagy: { page: 0, pages: 0 } };
  }
};

// Product - API - Get
export const getProduct = async (productId: string) => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/products/${productId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { tags: ['product'] },
    });
    const { data } = await response.json() as getProductResponse;
    return data;
  } catch (error) {
    console.error('An error occurred while fetching products: ', error);
    return { data: {} };
  }
};

// Product - API - Post - Add To Cart
export const addItemToCart = async (productId: string) => {
  try {
    const response = await fetch('http://api.localshop.test:3005/v1/cart/add_item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId }),
    });
    const data = await response.json() as getCartResponse;
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
    const response = await fetch(`http://api.localshop.test:3005/v1/products/${value}/reviews`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { tags: ['reviews'] },
    });
    const reviews = await response.json() as getReviewResponse;
    return reviews;
  } catch (error) {
    console.error('An error occurred while fetching products: ', error);
    return { reviews: { data: [] } };
  }
};

// Cart - API - Get
export const getCart = async () => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/cart`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      next: { tags: ['cart'] },
    });

    const { data } = await response.json() as getCartResponse;
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
    const response = await fetch(`http://api.localshop.test:3005/v1/cart/clear_items`, {
      method: 'DELETE',
      next: { tags: ['cart'] },
    });
    const data = await response.json() as getCartResponse;
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
    const response = await fetch(`http://api.localshop.test:3005/v1/cart/remove_item?product_id=${productId}`, {
      method: 'DELETE',
      next: { tags: ['cart'] },
    });
    const data = await response.json() as getCartResponse;
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
    const response = await fetch(`http://api.localshop.test:3005/v1/cart/update_quantity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity: quantity }),
      next: { tags: ['cart'] },
    });
    const data = await response.json() as getCartResponse;
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
    const response = await fetch(`http://api.localshop.test:3005/v1/cart/apply_coupon`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: value }),
    });
    const data = await response.json() as getCartResponse;
    return data;

  } catch (error) {
    console.error('An error occurred while fetching coupon: ', error);
    return error;
  }
};

// Cart => Discount - API - Delete
export const deleteDiscount = async () => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/cart/clear_coupon`, {
      method: 'DELETE',
      next: { tags: ['cart'] },
    });
    const data = await response.json() as getCartResponse;
    return data;
  } catch (error) {
    console.error('An error occurred while removing coupon: ', error);
    const data = {} as getCartResponse;
    return data;
  }
};
