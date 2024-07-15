// NextJS
import { cookies } from 'next/headers';

// Interfaces
import { HttpMethod, FetchOptions, ErrorObj } from '@interfaces/httpUtils';

export class FetchManager {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private buildUrl(endpoint: string, queryParams?: { [key: string]: string }): string {
    const url = new URL(this.baseUrl + endpoint);
    if (queryParams) {
      Object.keys(queryParams).forEach((key) => url.searchParams.append(key, queryParams[key]));
    }
    return url.toString();
  }

  private async request<T>(method: HttpMethod, endpoint: string, options?: FetchOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.queryParams);

    if (options?.body && !(options.body instanceof FormData)) {
      options.headers = {
        ...options.headers,
        'Content-Type': 'application/json',
      };
    }

    const fetchOptions: RequestInit = {
      method,
      headers: {
        Cookie: cookies().toString(),
        ...(options?.headers || {}),
      },
      body: options?.body || null,
      credentials: 'include',
    };

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw (await response.json()) as ErrorObj;
    }

    const data = (await response.json()) as T;
    return data;
  }

  public get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>('GET', endpoint, options);
  }

  public post<T>(endpoint: string, body?: BodyInit | null, options?: FetchOptions): Promise<T> {
    return this.request<T>('POST', endpoint, { ...options, body });
  }

  public patch<T>(endpoint: string, body: BodyInit | null, options?: FetchOptions): Promise<T> {
    return this.request<T>('PATCH', endpoint, { ...options, body });
  }

  public put<T>(endpoint: string, body: BodyInit | null, options?: FetchOptions): Promise<T> {
    return this.request<T>('PUT', endpoint, { ...options, body });
  }

  public delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>('DELETE', endpoint, options);
  }
}

export const handleError = (e: Error | ErrorObj | string): ErrorObj => {
  console.error('An error occurred: ', e);

  let error: ErrorObj = { message: 'An error occurred' };
  if (typeof e === 'object') {
    if (e.message) {
      const { message, items, status } = e as ErrorObj;
      error = { message: message };
      if (status === 422) error = { message: 'Validation Failed.', items: items };
    }

    const { error: fetchError } = e as unknown as { error: string };
    if (fetchError) error = { message: fetchError };
  } else {
    error = { message: e };
  }

  return error;
};
