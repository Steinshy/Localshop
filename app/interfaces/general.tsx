type LayoutProps = {
  children: React.ReactNode;
};

type BreadcrumbProps = {
  items: Array<{ title: string; href?: string | undefined }>;
};

type StepperProps = {
  steps: string[];
  current: number;
};

type PagyProps = {
  page: number;
  pages: number;
}

export type { PagyProps, LayoutProps, BreadcrumbProps, StepperProps };
