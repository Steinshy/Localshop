export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Localshop",
  description: "A shopping website for browser items close to your home",
  navItems: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Our Products",
      href: "/products",
    },
    {
      label: "About Us",
      href: "/about",
    },
  ],

  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    discord: "https://discordapp.com",
  },
};

// Global interface

// productsCard
export type ProductCardProps = {
  product: ProductInterface;
  isLoading?: boolean;
};

// productsCard
export type ProductInterface = {
  id: number;
  description: string;
  price: number;
  title: string;
  category: string;
  thumbnail: string;
  images: [string];
};

// Footer
export type LinkItemProps = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
};

// ProductImages
export type ProductImagesProps = {
  alt: string;
  main: string;
  images: [string];
};

// CartItem
export type CartItem = {
  id: number;
  color?: string;
  size?: string;
  discount: number;
  quantity: number;
  price: number;
  title: string;
  category: string;
  thumbnail: string;
};

// BreadCrumb
export type BreadcrumbProps = {
  id: string;
}
