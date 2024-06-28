"use server";

// Next Cache
import { revalidateTag } from 'next/cache';

// Interface
import { AddressResponse, AddressValuesProps } from '@interfaces/address';
import { getProductsResponse } from '@interfaces/products';
import { getProductResponse } from '@interfaces/product';
import { getReviewResponse } from '@interfaces/reviews';
import { getCartResponse } from '@interfaces/cart';
import { getUserResponse } from '@interfaces/user';

// User Address API - Get
export const getAddresses = async () => {
  revalidateTag('user');
  const response = await fetch('http://api.localshop.test:3005/v1/addresses', { next: { tags: ['user'] } });
  const data = await response.json() as { data: AddressResponse[] };
  const { data: addresses } = data;
  return addresses;
};
// User Address API - Create
export const CreateAddress = async (newAddress: AddressValuesProps) => {
  revalidateTag('user');
  await fetch('http://api.localshop.test:3005/v1/addresses', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: newAddress }),
  });
  return getAddresses();
};

// User Address API - Update
export const UpdateAddress = async (id: number, newAddress: AddressValuesProps) => {
  revalidateTag('user');
  await fetch(`http://api.localshop.test:3005/v1/addresses/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address: newAddress }),
  });
  return getAddresses();
};

// User Address API - Remove
export const RemoveAddress = async (id: number) => {
  revalidateTag('user');
  await fetch(`http://api.localshop.test:3005/v1/addresses/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return getAddresses();
};

// Products API - Get
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

// Product API - Get
export const getProduct = async (productId: string) => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/products/${productId}`, {
      next: { tags: ['product'] },
    });
    const { data } = await response.json() as getProductResponse;
    return data;

  } catch (error) {
    console.error('An error occurred while fetching products: ', error);
    return { data: {} };
  }
};

// Product Review API - Get
export const getProductReviews = async (value: string) => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/products/${value}/reviews`, {
      next: { tags: ['reviews'] },
    });
    const reviews = await response.json() as getReviewResponse;
    return reviews;

  } catch (error) {
    console.error('An error occurred while fetching products: ', error);
    return { reviews: { data: [] } };
  }
};

// Product - Add To Cart - Update
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

// Cart API - Get
export const getCart = async () => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/cart`, {
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

// Cart API - Delete
export const deleteCart = async () => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/cart/clear`, {
      method: 'delete',
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

// Cart API - Delete Item
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

// Cart API - Update Quantity
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

// User - API - Get
export const getUser = async () => {
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/user`, {
      next: { tags: ['user'] },
    });
    const data = await response.json() as getUserResponse;
    return data;

  } catch (error) {
    console.error('An error occurred while fetching user: ', error);
    const data = {} as getUserResponse;
    return data;
  }
};
