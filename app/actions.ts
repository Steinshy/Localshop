'use server';

import { revalidateTag } from 'next/cache';
import { AddressObj } from '@interfaces/address';

export const getAddresses = async () => {
  revalidateTag('user');
  const response = await fetch('http://api.localshop.test:3005/v1/addresses', { next: { tags: ['user'] } });
  const data = await response.json() as { data: AddressObj[] };
  const { data:addresses } = data;
  return addresses;  
};

export const handleRemoveAddress = async (id:number) => {
  revalidateTag('user');
  await fetch(`http://api.localshop.test:3005/v1/addresses/${id}`, { method: 'DELETE' });
  return getAddresses();
};