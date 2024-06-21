'use server';

// Next Cache
import { revalidateTag } from 'next/cache';

// Interface

import { AddressResponse, AddressValuesProps } from '@interfaces/address';
import { getProductsResponse } from '@interfaces/products';
import { getProductResponse } from '@interfaces/product';
// import { ProductDataProps, ProductResponse } from '@interfaces/product';
// import { ReviewDataProps } from '@interfaces/reviews';
import { CartResponse } from '@interfaces/cart';

// User Address API - Get
export const getAddresses = async () => {
  revalidateTag('user');
  const response = await fetch('http://api.localshop.test:3005/v1/addresses', { next: { tags: ['user'] } });
  const data = (await response.json()) as { data: AddressResponse[] };
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
      next: { tags: ['products'] },
    });
    const { products, pagy } = (await response.json()) as getProductsResponse;
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
    const { data } = (await response.json()) as getProductResponse;
    const { attributes } = data;
    const { id, title, description, thumbnail, price, images } = attributes;
    return { id, title, description, thumbnail, price, images };
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
    const { reviews } = (await response.json()) as { reviews: { data: ReviewDataProps[] } };
    return { reviews };
  } catch (error) {
    console.error('An error occurred while fetching products: ', error);
    return { data: {} };
  }
};

// Product - Add To Cart - Update
export const addItemToCart = async (product_id: string) => {
  try {
    const response = await fetch('http://api.localshop.test:3005/v1/cart/add_item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id }),
    });
    const data = await response.json() as { data: CartResponse };
    return data;
    
  } catch (error) {
    console.error('An error occurred while adding item to cart: ', error);
    return { data: {} };
  }
};
