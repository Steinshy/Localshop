// Interfaces
import { OrdersObj } from "@/app/interfaces/user";

type LayoutProps = {
  children: React.ReactNode;
};

type PageProps = {
  params: {
    id: string;
  };
}

type BreadcrumbProps = {
  items: Array<{ title: string; href?: string | undefined }>;
};

type StepperProps = {
  steps: string[];
  current: number;
}

type OrderCardProps = {
  order: OrdersObj;
}

export type {
  LayoutProps,
  BreadcrumbProps,
  PageProps,
  StepperProps,
  OrderCardProps
}
