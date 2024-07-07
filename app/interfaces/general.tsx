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
  currentStep: number;
};

type PagyProps = {
  page: number;
  pages: number;
};

export type { HttpMethod, FetchOptions, ErrorObj, LayoutProps, BreadcrumbProps, StepperProps, PagyProps };
