type LayoutProps = {
  children: React.ReactNode;
};



type BreadcrumbProps = {
  items: Array<{ title: string; href?: string | undefined }>;
};

type StepperProps = {
  steps: string[];
  current: number;
}

export type {
  LayoutProps,
  BreadcrumbProps,
  StepperProps
}
