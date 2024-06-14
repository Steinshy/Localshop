"use server";

import { revalidateTag } from "next/cache";
import { AddressObj, AddressValuesProps } from "@interfaces/address";
import { ProductDataProps } from "@interfaces/product";

// User Address API - Get
export const getAddresses = async () => {
  revalidateTag("user");
  const response = await fetch("http://api.localshop.test:3005/v1/addresses", { next: { tags: ["user"] } });
  const data = (await response.json()) as { data: AddressObj[] };
  const { data: addresses } = data;
  return addresses;
};
// User Address API - Create
export const handleCreateAdress = async (newAddress: AddressValuesProps) => {
  revalidateTag("user");
  await fetch("http://api.localshop.test:3005/v1/addresses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: newAddress }),
  });
  return getAddresses();
};
// User Address API - Update
export const handleUpdateAddress = async (id: number, newAddress: AddressValuesProps) => {
  revalidateTag("user");
  await fetch(`http://api.localshop.test:3005/v1/addresses/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: newAddress }),
  });
  return getAddresses();
};

// User Address API - Remove
export const handleRemoveAddress = async (id: number) => {
  revalidateTag("user");
  await fetch(`http://api.localshop.test:3005/v1/addresses/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  return getAddresses();
};

// Products API - Get

export const getProducts = async (page: number, query: string) => {
  page = page || 1;
  query = query || "";
  revalidateTag("products");
  console.log(page, "page, query");
  const testURL = `http://api.localshop.test:3005/v1/products?page=${page}&q=${query}`;
  console.log(testURL, "url");
  try {
    const response = await fetch(`http://api.localshop.test:3005/v1/products?page=${page}&q=${query}`);
    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }
    const { products, pagy } = (await response.json()) as ProductDataProps;
    const { pages } = pagy;
    const { data } = products;
    return { data, pages };
  } catch (error) {
    console.error("An error occurred while fetching products:", error);
    return { data: [], pages: 0 };
  }
};
