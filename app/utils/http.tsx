// Axios instance with interceptors
import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { setupCache } from "axios-cache-interceptor";

const config: AxiosRequestConfig = {
  baseURL: "http://api.localshop.test:3005/v1",
  headers: { "Content-Type": "application/json" },
};

// Creating the instance
const http: AxiosInstance = axios.create(config);

// Request Interceptor
const onRequest = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  return config;
};

// Response Interceptor
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// Error Response Interceptor
const onErrorResponse = (error: AxiosError | Error): Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    const { status } = (error.response as AxiosResponse) ?? {}; // statusText

    switch (status) {
      case 401: {
        // "Login required"
        break;
      }
      case 403: {
        // "Permission denied"
        break;
      }
      case 404: {
        // "Invalid request"
        break;
      }
      case 500: {
        // "Server error"
        break;
      }
      default: {
        // "Unknown error occurred"
        break;
      }
    }
  } else {
    console.error(`Error ${error.message}`);
  }

  return Promise.reject(error);
};

const setupInterceptors = (instance: AxiosInstance): AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);

  return setupCache(instance);
};

export default setupInterceptors(http);
