// Interfaces
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

export type FetchOptions = {
  headers?: { [key: string]: string };
  queryParams?: { [key: string]: string };
  body?: BodyInit | null;
  next?: {
    tags: string[];
  };
};

export type ErrorObj = {
  message: string;
  items?: { [key: string]: string };
  status?: number;
};

export type ReceivedData = {
  type: 'user' | 'cart';
};
