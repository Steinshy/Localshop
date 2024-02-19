import { Navbar as NextUiNavbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Input } from "@nextui-org/input";
import { Kbd } from "@nextui-org/kbd";
import { DiCssdeck } from "react-icons/di";
import { FaDiscord, FaGithub, FaTwitter, FaSearch } from "react-icons/fa";
import { siteConfig } from "../config/site";

export default function Navbar() {
  const searchInput = (
    <Input 
    aria-label="Search"
    classNames={{inputWrapper: "bg-default-100",
    input: "text-sm"}}
    endContent={
      <Kbd className="hidden lg:inline-block" keys={["command"]}>K</Kbd>
    }
    labelPlacement="outside"
    placeholder="Search..."
    startContent={
      <FaSearch className="text-base text-default-400 pointer-events-none flex-shrink-0" />
    }
    type="search"/>
    );

  return (
    // User menues
    <NextUiNavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Link className="flex justify-start items-center gap-1" href="/">
            <DiCssdeck />
            <p className="font-bold text-inherit">{siteConfig.name}</p>
          </Link>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link isBlock
                className="data-[active=true]:text-primary data-[active=true]:font-medium"
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      {/* socials menus */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
            <FaTwitter className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
            <FaDiscord className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <FaGithub className="text-default-500" />
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      {/* NavbarMenu toggle */}

      <NavbarMenu>
        {searchInput}
        
      </NavbarMenu>


    </NextUiNavbar>

    // <Navbar>
    //   <NavbarBrand>
    //     <p className="font-bold text-inherit">LocalShop</p>
    //   </NavbarBrand>
    //   <NavbarContent className="hidden sm:flex gap-4" justify="center">
    //   <NavbarItem isActive aria-current="page">
    //       <Link color="foreground" href="/">
    //         Home
    //       </Link>
    //     </NavbarItem>
    //     <NavbarItem isActive aria-current="page">
    //       <Link color="foreground" href="productPage">
    //         Products
    //       </Link>
    //     </NavbarItem>
    //   </NavbarContent>
    //   <NavbarContent justify="end">
    //     <NavbarItem className="hidden lg:flex">
    //       <Link href="#">Login</Link>
    //     </NavbarItem>
    //     <NavbarItem>
    //       <Button as={Link} color="primary" href="#" variant="flat">
    //         Sign Up
    //       </Button>
    //     </NavbarItem>
    //   </NavbarContent>
    // </Navbar>
  );
}
