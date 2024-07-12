import { SVGProps } from 'react';
import { CategoryProps } from './categories';

export type LayoutProps = {
  children: React.ReactNode;
};

export type SvgIconProps = SVGProps<SVGSVGElement> & {
  color?: string;
};

export type BreadcrumbProps = {
  requestUrl?: string;
};

export type BreadcrumbItems = Array<{ title: string; href?: string | undefined }>

export type StepperProps = {
  steps: string[];
  pathToStepMap: { [key: string]: number };
};

export type PagyProps = {
  page: number;
  pages: number;
};

export type HeaderProps = {
  categories: CategoryProps[];
};

export type GooglePlaceAddress = {
  address_components: { short_name: string; long_name: string, types: string[] }[];
};

export type GoogleAddressObj = {
  street_number: string;
  route: string;
  country: string;
  administrative_area_level_2: string;
  locality: string;
  postal_code: string;
}
