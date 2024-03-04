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
  }
};

export type ProductInterface = {
  id: number;
  price: number;
  title: string;
  category: string;
  thumbnail: string
}

export type LinkItemProps = {
  text?: string;
  isTag?: boolean;
  tagText?: string;
}