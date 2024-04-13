type LayoutProps = {
  children: React.ReactNode;
};

type BreadcrumbProps = {
  items: Array<{ title: string; href?: string | undefined }>;
};

export type {
  LayoutProps,
  BreadcrumbProps
}
