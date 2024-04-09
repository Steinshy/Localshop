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
import { FaCartArrowDown, FaChevronDown } from "react-icons/fa";

// Interface
import { NavbarProps, CartBadgeProps } from "../utils/interfaces";

// Utils - Site Config - CartContext
import { siteConfig } from "../utils/siteConfig";
// Utils - subProviders
import { UserContext, CartContext } from "../utils/subProviders";
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

const CartBadge: FC<CartBadgeProps> = ({ quantity }) => {
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

export default function Header() {
  const pathname = usePathname();
  const cartStore = useContext(CartContext),
    userStore = useContext(UserContext);
  const userName = userStore.user.lastname + " " + userStore.user.firstname;
  const cartQuantity = cartStore.data.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Navbar isBlurred isBordered>
      <NavbarContent className="" justify="start">
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
            <Dropdown placement="bottom-end">
              <Button
                variant="light"
                className="text-white pl-1"
                radius="full"
                startContent={
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform"
                    color="primary"
                    name="User"
                    size="sm"
                    src="https:i.pravatar.cc/150?u=a042581f4e29026704d"
                  />
                }
                endContent={
                  <div>
                    <FaChevronDown />
                  </div>
                }
              >
                <span className="pl-2 hidden sm:block font-semibold">{userName}</span>
              </Button>
              <DropdownTrigger>
                <DropdownMenu aria-label="Profile Actions" variant="flat">
                  <DropdownItem href="/user/profile" key="profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem href="/user/settings" key="settings">
                    Settings
                  </DropdownItem>
                  <DropdownItem href="/user/orders" key="orders">
                    Orders
                  </DropdownItem>
                  <DropdownItem key="logout" color="danger">
                    Login
                  </DropdownItem>
                </DropdownMenu>
              </DropdownTrigger>
            </Dropdown>
          </NavbarItem>
        )}
        <NavbarItem key="themswitcher">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
