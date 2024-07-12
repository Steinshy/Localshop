import { SVGProps } from 'react';
import { CategoryProps } from './categories';

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

export type HeaderProps = {
  categories: CategoryProps[];
}

export type GooglePlaceAddress = {
  address_components: { short_name: string; long_name: string }[];
}

export type { LayoutProps, SvgIconProps, BreadcrumbProps, StepperProps, PagyProps };
