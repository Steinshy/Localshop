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
      label: "Products",
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