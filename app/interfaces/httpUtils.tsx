// Interfaces
type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

type FetchOptions = {
  headers?: { [key: string]: string };
  queryParams?: { [key: string]: string };
  body?: BodyInit | null;
  next?: {
    tags: string[];
  };
};

type ErrorObj = {
  message: string;
  items?: { [key: string]: string };
  status?: number;
};

type ReceivedData = {
  type: 'user' | 'cart';
};

export type { HttpMethod, FetchOptions, ErrorObj, ReceivedData };
