import { SVGProps } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

type SvgIconProps = SVGProps<SVGSVGElement> & {
  color?: string;
};

type BreadcrumbProps = {
  items: Array<{ title: string; href?: string | undefined }>;
};

type StepperProps = {
  steps: string[];
  pathToStepMap: { [key: string]: number };
};

type PagyProps = {
  page: number;
  pages: number;
};

export type { LayoutProps, SvgIconProps, BreadcrumbProps, StepperProps, PagyProps };
