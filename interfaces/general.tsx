// React
import { SVGProps } from 'react';

// Interfaces
import { CategoryProps } from '@interfaces/categories';

export type LayoutProps = {
  children: React.ReactNode;
};

export type BreadcrumbProps = {
  requestUrl?: string;
};

export type BreadcrumbItems = Array<{ title: string; href?: string | undefined }>;

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

export type FooterProps = {
  categories: CategoryProps[];
};

export type MobileMenuProps = {
  navItems: { key: string; href: string; label: string }[];
  isMobileMenuOpen: boolean;
  handleMobileMenu: () => void;
  isItemActive: (item: { key: string; href: string; label: string }) => boolean;
};

export type GooglePlaceAddress = {
  address_components: { short_name: string; long_name: string; types: string[] }[];
};

export type GoogleAddressObj = {
  street_number: string;
  route: string;
  country: string;
  administrative_area_level_2: string;
  locality: string;
  postal_code: string;
};
