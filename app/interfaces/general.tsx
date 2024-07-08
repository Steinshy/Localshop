// Interfaces
import { ReactNode } from "react";
import { CartResponse } from "./cart";
import { UserResponse } from "./user";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

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

type LayoutProps = {
  children: React.ReactNode;
};

type BreadcrumbProps = {
  items: Array<{ title: string; href?: string | undefined }>;
};

type StepperProps = {
  steps: string[];
  pathToStepMap: { [key: string]: number; };
};

type PagyProps = {
  page: number;
  pages: number;
};

type ProviderProps = {
  children: ReactNode;
  initialUser: UserResponse;
  initialCart: CartResponse;
}

export type { ProviderProps, HttpMethod, FetchOptions, ErrorObj, LayoutProps, BreadcrumbProps, StepperProps, PagyProps };
