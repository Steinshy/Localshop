// fetchManager
export type HttpMethod = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';

// fetchManager
export type FetchOptions = {
  headers?: { [key: string]: string };
  queryParams?: { [key: string]: string };
  body?: BodyInit | null;
  next?: {
    tags: string[];
  };
};

// fetchManager | General Actions Usage
export type ErrorObj = {
  message: string;
  items?: { [key: string]: string };
  status?: number;
};
