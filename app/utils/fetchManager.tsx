type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface FetchOptions {
  headers?: { [key: string]: string };
  queryParams?: { [key: string]: string };
  body?: BodyInit | null;
  next?: {
    tags: string[]
  };
}

export class FetchManager {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  }

  private buildUrl(endpoint: string, queryParams?: { [key: string]: string }): string {
    const url = new URL(this.baseUrl + endpoint);
    if (queryParams) {
      Object.keys(queryParams).forEach(key => url.searchParams.append(key, queryParams[key]));
    }
    return url.toString();
  }

  private async request<T>(method: HttpMethod, endpoint: string, options?: FetchOptions): Promise<T> {
    const url = this.buildUrl(endpoint, options?.queryParams);
    const fetchOptions: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {})
      },
      body: options?.body || null
    };

    if (options?.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
      fetchOptions.body = JSON.stringify(options.body);
      fetchOptions.headers = {
        ...fetchOptions.headers,
        'Content-Type': 'application/json'
      };
    }

    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      throw new Error(`Error: ${url} - ${response.statusText}`);
    }

    const data = (await response.json()) as T;
    return data;
  }

  public get<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>('GET', endpoint, options);
  }

  public post<T>(endpoint: string, body: BodyInit | null, options?: FetchOptions): Promise<T> {
    return this.request<T>('POST', endpoint, { ...options, body });
  }

  public put<T>(endpoint: string, body: BodyInit | null, options?: FetchOptions): Promise<T> {
    return this.request<T>('PUT', endpoint, { ...options, body });
  }

  public delete<T>(endpoint: string, options?: FetchOptions): Promise<T> {
    return this.request<T>('DELETE', endpoint, options);
  }
}

export const handleError = (e:unknown):object => {
  console.error('An error occurred: ', e);
  let error = {};
  if (e instanceof Error) {
    error = { message: e.message };
  } else {
    error = e as string;
  }
  return error;
}