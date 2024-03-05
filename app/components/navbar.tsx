'use client';

// React
import { useState, useContext } from "react";

// NextUi - Icon
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { Link as NextLink, Input, NavbarContent, Divider, Button, NavbarItem, Navbar, Badge } from "@nextui-org/react";
import { DiCssdeck } from "react-icons/di";
import { FaCartArrowDown, FaSearch } from "react-icons/fa";

// Site Config
import { siteConfig } from "../config/site";

// Components - cartProvider
import { CartContext } from "../utils/cartProvider";

// ThemeSwitcher
import { ThemeSwitcher } from "./switcher";

export default function Header() {
  const pathname = usePathname();
  const cartStore = useContext(CartContext);
  
  // State for the search query
  const [query, setQuery] = useState("");

  // Handles the query change
  const handleQueryChange = (value: string) => {
    setQuery(value);
  };

  // Handles the form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevents the default form submission
    console.log("Form submitted");
    console.log(query); // Logs the query to the console

    // TODO: Implement search functionality
  }

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
            <NextLink
              as={Link}
              color="foreground"
              href={item.href}
            >
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
              onChange={(e) => handleQueryChange(e.target.value)}
              startContent={<FaSearch />}
            />
          </form>
        </NavbarItem>

        <NavbarItem>
          <Badge isInvisible={cartStore.data.length <= 0} content={cartStore.data.length} color="danger" placement="top-right" variant="shadow">
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
