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

export type { BreadcrumbProps, StepperProps, PagyProps };
