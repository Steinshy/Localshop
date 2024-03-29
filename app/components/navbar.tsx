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
  Avatar,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Dropdown,
} from "@nextui-org/react";
import { DiCssdeck } from "react-icons/di";
import { FaCartArrowDown } from "react-icons/fa";

// Interface - Utils
import { NavbarProps } from "../utils/interfaces";

// Utils - Site Config - CartContext
import { siteConfig } from "../utils/siteConfig";
import { CartContext } from "../utils/cartProvider";
import { UserContext } from "../utils/userProvider";
import { ThemeSwitcher } from "../utils/themeSwitcher";

const NavbarItemLink: FC<NavbarProps> = ({ href, isActive, children }) => {
  return (
    <NavbarItem isActive={isActive}>
      <NextLink as={Link} color="foreground" href={href}>
        {children}
      </NextLink>
    </NavbarItem>
  );
};

const UserItemsLink: FC<NavbarProps> = ({ href, isActive, children }) => {
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
      variant="shadow"
      isInvisible={quantity === 0}
    >
      <Button as={Link} href="/order/cart" isIconOnly variant="light">
        <FaCartArrowDown className="text-2xl" />
      </Button>
    </Badge>
  );
};

const UserDropdown: FC<{ userFirstName: string }> = ({ userFirstName }) => {
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="primary"
          name={userFirstName}
          size="sm"
          // src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
        />
      </DropdownTrigger>

      <DropdownMenu aria-label="Profile Actions" variant="flat">
        {siteConfig.userItems.map((item) => (
          <DropdownItem key={item.href}>
            <UserItemsLink key={item.href} href={item.href} isActive={false}>
              {item.label}
            </UserItemsLink>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default function Header() {
  const pathname = usePathname();
  const cartStore = useContext(CartContext),
    userStore = useContext(UserContext);
  const cartQuantity = cartStore.data.reduce((acc, item) => acc + item.quantity, 0);
  const userFirstName = userStore.data.firstname;

  console.log("userFirstName");
  console.log(userFirstName);

  return (
    <Navbar isBlurred isBordered position="sticky">
      <NavbarContent className="hidden sm:flex gap-4" justify="start">
        <NavbarItemLink href="/" isActive={pathname === "/"}>
          <DiCssdeck />
          <p className="ml-1 font-light">{siteConfig.name}</p>
        </NavbarItemLink>
        {siteConfig.navItems.map((item) => (
          <NavbarItemLink key={item.href} href={item.href} isActive={pathname === item.href}>
            {item.label}
          </NavbarItemLink>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <CartBadge quantity={cartQuantity} />
        </NavbarItem>

        {userStore.isLogged() && (
          <NavbarItem>
            <UserDropdown userFirstName={userFirstName} />
          </NavbarItem>
        )}

        <Divider orientation="vertical" />
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
