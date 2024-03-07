"use client";

// React
import { useState, useContext } from "react";

// NextJS - Navigation - Link
import { usePathname } from "next/navigation";
import Link from "next/link";

// NextUi - React Icon
import { Link as NextLink, Input, NavbarContent, Divider, Button, NavbarItem, Navbar, Badge } from "@nextui-org/react";
import { DiCssdeck } from "react-icons/di";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";

// Utils - Site Config - cartProvider
import { siteConfig } from "../utils/site";
import { CartContext } from "../utils/cartProvider";

// ThemeSwitcher
import { ThemeSwitcher } from "./switcher";

// Handles the query change
const handleQueryChange = (setQuery: (value: string) => void) => (value: string) => {
    setQuery(value);
  };

// Handles the form submission
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault(); // Prevents the default form submission
  // TODO: Implement search functionality
};

export default function Header() {
  const pathname = usePathname();
  const cartStore = useContext(CartContext);

  // State for the search query
  const [query, setQuery] = useState("");

  const cartQuantity = cartStore.data.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar isBlurred isBordered position="sticky">
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItem>
          <Link color="foreground" href="/" className="flex items-center">
            <DiCssdeck />
            <p className="ml-1 font-light">LOCALSHOP</p>
          </Link>
        </NavbarItem>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={pathname === item.href}>
            <NextLink as={Link} color="foreground" href={item.href}>
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <form onSubmit={handleSubmit} action="#">
            <Input
              aria-label="Search"
              placeholder="Type and press enter..."
              type="search"
              value={query}
              onChange={(e) => handleQueryChange(setQuery)}
              startContent={<FaSearch />}
            />
          </form>
        </NavbarItem>

        <NavbarItem>
          <Badge
            isInvisible={cartStore.data.length <= 0}
            content={cartQuantity}
            color="danger"
            placement="top-right"
            variant="shadow"
          >
            <Button as={Link} href="/cart" isIconOnly variant="light">
              <FaCartArrowDown className="text-2xl" />
            </Button>
          </Badge>
        </NavbarItem>
        <Divider orientation="vertical" />
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
