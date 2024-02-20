import {
  Navbar as ChackraUiNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";
import { Input } from "@chakra-ui/react";
import { Kbd } from "@chakra-ui/react";
import { DiCssdeck } from "react-icons/di";
import { FaDiscord, FaGithub, FaTwitter, FaSearch } from "react-icons/fa";
import { siteConfig } from "../config/site";

export default function Navbar() {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <FaSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    // <ChackraUiNavbar maxWidth="xl" position="sticky">
    //   <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
    //     <NavbarBrand as="li" className="gap-3 max-w-fit">
    //       <Link className="flex justify-start items-center gap-1" href="/">
    //         <DiCssdeck />
    //         <p className="font-bold text-inherit">{siteConfig.name}</p>
    //       </Link>
    //     </NavbarBrand>
    //     <ul className="hidden lg:flex gap-4 justify-start ml-2">
    //       {siteConfig.navItems.map((item) => (
    //         <NavbarItem key={item.href}>
    //           <Link
    //             isBlock
    //             className="data-[active=true]:text-primary data-[active=true]:font-medium"
    //             color="foreground"
    //             href={item.href}
    //           >
    //             {item.label}
    //           </Link>
    //         </NavbarItem>
    //       ))}
    //     </ul>
    //   </NavbarContent>

    //   {/* socials menus */}
    //   <NavbarContent
    //     className="hidden sm:flex basis-1/5 sm:basis-full"
    //     justify="end"
    //   >
    //     <NavbarItem className="hidden sm:flex gap-2">
    //       <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
    //         <FaTwitter className="text-default-500" />
    //       </Link>
    //       <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
    //         <FaDiscord className="text-default-500" />
    //       </Link>
    //       <Link isExternal href={siteConfig.links.github} aria-label="Github">
    //         <FaGithub className="text-default-500" />
    //       </Link>
    //     </NavbarItem>
    //   </NavbarContent>

    //   {/* NavbarMenu toggle */}
    //   <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
    //     <NavbarMenuToggle />
    //   </NavbarContent>

    //   {/* NavbarMenue content */}
    //   <NavbarMenu>
    //     {searchInput}
    //     <div className="mx-4 mt-2 flex flex-col gap-2">
    //       {siteConfig.navItems.map((item, index) => (
    //         <NavbarItem key={`${item}-${index}`}>
    //           <Link
    //             color={
    //               index == 2
    //                 ? "primary"
    //                 : index === siteConfig.navItems.length - 1
    //                 ? "danger"
    //                 : "foreground"
    //             }
    //             href={item.href}
    //           >
    //             {item.label}
    //           </Link>
    //         </NavbarItem>
    //       ))}
    //     </div>
    //   </NavbarMenu>
    // </ChackraUiNavbar>
    <div className="flex flex-row gap-3 justify-center items-center p-4 bg-neutral-900/25">
      <div className="flex flex-col">
        <Link className="flex justify-start items-center gap-1" href="/">
          <DiCssdeck />
          <p className="font-bold text-inherit">{siteConfig.name}</p>
        </Link>
      </div>

      <div className="flex flex-col flex-grow">
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <li key={item.href}>
              <a
                className="data-[active=true]:text-primary data-[active=true]:font-medium"
                color="foreground"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col-grow">
        <a href={siteConfig.links.twitter} aria-label="Twitter">
          <FaTwitter className="text-default-500" />
        </a>
        <a href={siteConfig.links.discord} aria-label="Discord">
          <FaDiscord className="text-default-500" />
        </a>
        <a href={siteConfig.links.github} aria-label="Github">
          <FaGithub className="text-default-500" />
        </a>
      </div>
    </div>
  );
}
