export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Localshop",
  description: "A shopping website for browser items close to your home",
  navItems: [
    {
      label: "Our Products",
      href: "/productPage",
    },
    {
      label: "About Us",
      href: "/aboutUs",
    },
  ],

  links: {
    github: "https://github.com",
    twitter: "https://twitter.com",
    discord: "https://discordapp.com",
  },
};
