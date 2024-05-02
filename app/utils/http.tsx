// Axios instance with interceptors
import axios, { AxiosInstance, AxiosResponse, AxiosError, AxiosRequestConfig,
                InternalAxiosRequestConfig } from 'axios';
import { setupCache } from "axios-cache-interceptor";

const config: AxiosRequestConfig = {
  baseURL: "https://dummyjson.com",
  headers: { "Content-Type": "application/json" },
};

// Creating the instance
const http: AxiosInstance = axios.create(config);

// Request Interceptor
const onRequest = (config:InternalAxiosRequestConfig):InternalAxiosRequestConfig => {
  // const { method, url, headers } = config;
  return config;
};

// Response Interceptor
const onResponse = (response:AxiosResponse):AxiosResponse => {
  // const { method, url } = response.config;
  // const { status } = response;
  return response;
};

// Error Response Interceptor
const onErrorResponse = (error:AxiosError | Error):Promise<AxiosError> => {
  if (axios.isAxiosError(error)) {
    // const { message } = error;
    // const { method, url } = error.config as AxiosRequestConfig;
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

const setupInterceptors = (instance:AxiosInstance):AxiosInstance => {
  instance.interceptors.request.use(onRequest, onErrorResponse);
  instance.interceptors.response.use(onResponse, onErrorResponse);

  return setupCache(instance);
};

export default setupInterceptors(http)
