"use client";

// React
import React, { useContext, FC } from "react";

// NextJS - Navigation - Link
import { usePathname } from "next/navigation";
import Link from "next/link";

// NextUi - React Icon
import {
  Link as NextLink,
  NavbarContent,
  Divider,
  Button,
  NavbarItem,
  Navbar,
  Badge,
} from "@nextui-org/react";
import { DiCssdeck } from "react-icons/di";
import { FaCartArrowDown } from "react-icons/fa";

// Interface
import { NavbarInterface } from "../utils/interfaces";

// Utils - Site Config - CartContext
import { siteConfig } from "../utils/siteConfig";
import { CartContext } from "../utils/cartProvider";
import { ThemeSwitcher } from "../utils/themeSwitcher";

const NavbarItemLink: FC<NavbarInterface> = ({ href, isActive, children }) => {
  return (
    <NavbarItem isActive={isActive}>
      <NextLink as={Link} color="foreground" href={href}>
        {children}
      </NextLink>
    </NavbarItem>
  );
};

const CartBadge: FC<{ quantity: number }> = ({ quantity }) => {
  return (
    <Badge
      content={quantity > 0 ? quantity : null}
      color="danger"
      placement="top-right"
      variant="shadow">
      <Button as={Link} href="/cart" isIconOnly variant="light">
        <FaCartArrowDown className="text-2xl" />
      </Button>
    </Badge>
  )
}

export default function Header() {
  const pathname = usePathname();
  const cartStore = useContext(CartContext);
  const cartQuantity = cartStore.data.reduce( (acc, item) => acc + item.quantity, 0);

  return (
    <Navbar isBlurred isBordered position="sticky">
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItemLink href="/" isActive={pathname === "/"}>
          <DiCssdeck />
          <p className="ml-1 font-light">{siteConfig.name}</p>
        </NavbarItemLink>
        {siteConfig.navItems.map((item) => (
          <NavbarItemLink
            key={item.href}
            href={item.href}
            isActive={pathname === item.href}
          >
            {item.label}
          </NavbarItemLink>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <CartBadge quantity={cartQuantity} />
        </NavbarItem>

        <Divider orientation="vertical" />
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}