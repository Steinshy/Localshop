"use client";

// React
import React, { useContext, useState, FC } from "react";

// NextJS - Navigation - Link
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

// NextUi - React Icon
import {
  Link as NextLink,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
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
import {
  FaCartArrowDown,
  FaChevronDown,
  FaRegUserCircle,
  FaUserCog,
  FaShoppingBag,
  FaSignOutAlt,
} from "react-icons/fa";

// Interface
import {
  NavbarProps,
  CartBadgeProps,
  UserDefaultData,
  UsermenuNotLoggedProps,
  UsermenuLoggedProps,
} from "../utils/interfaces";

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

const UsermenuLogged: FC<UsermenuLoggedProps> = ({
  userLastName,
  userFirstName,
  handleUserMenuOpen,
  isUserMenuOpen,
  handleUserKeySelection,
}) => {
  return (
    <Dropdown placement="bottom-end" onOpenChange={handleUserMenuOpen}>
      <DropdownTrigger>
        <Button
          variant="light"
          className="pl-1"
          radius="full"
          startContent={
            <Avatar
              isBordered
              className="transition-transform"
              color="primary"
              size="sm"
              src="https:i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          }
          endContent={
            <div className={`transition-transform	${isUserMenuOpen ? "rotate-180" : "rotate-0"}`}>
              <FaChevronDown />
            </div>
          }
        >
          <span className="pl-2 hidden sm:block font-semibold">
            {userLastName} {userFirstName}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleUserKeySelection} aria-label="Profile Actions" variant="flat">
        <DropdownItem startContent={<FaRegUserCircle />} key="profile">
          Profile
        </DropdownItem>
        <DropdownItem startContent={<FaShoppingBag />} key="addresses">
          Addresses
        </DropdownItem>
        <DropdownItem startContent={<FaUserCog />} key="settings">
          Settings
        </DropdownItem>
        <DropdownItem startContent={<FaShoppingBag />} key="orders">
          Orders
        </DropdownItem>
        <DropdownItem startContent={<FaSignOutAlt />} key="logout" color="danger">
          Logout
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

const UsermenuNotLogged: FC<UsermenuNotLoggedProps> = ({ handleUserLogin }) => {
  return (
    <Button variant="solid" radius="sm" color="primary" size="sm" onClick={handleUserLogin}>
      <span className="font-semibold">Login</span>
    </Button>
  );
};

export default function Header() {
  const router = useRouter(),
    pathname = usePathname(),
    cartStore = useContext(CartContext),
    userStore = useContext(UserContext);
  const cartQuantity = cartStore.data.reduce((acc, item) => acc + item.quantity, 0);

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const handleUserKeySelection = (value: React.Key): void => {
    if (value === "logout") {
      if (pathname.match(/user\/.*/)) router.push("/");
      return userStore.logout();
    }
    router.push(`/user/${value}`);
  };

  const handleUserLogin = () => {
    userStore.update(UserDefaultData);
  };

  const handleUserMenuOpen = (bool: boolean) => {
    setIsUserMenuOpen(bool);
  };

  return (
    <Navbar isBlurred isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent className="flex sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="start">
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
        {userStore.isLogged() ? (
          <NavbarItem>
            <UsermenuLogged
              userLastName={userStore.user.lastname}
              userFirstName={userStore.user.firstname}
              handleUserMenuOpen={handleUserMenuOpen}
              isUserMenuOpen={isUserMenuOpen}
              handleUserKeySelection={handleUserKeySelection}
            />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <UsermenuNotLogged handleUserLogin={handleUserLogin} />
          </NavbarItem>
        )}
        <NavbarItem key="themswitcher">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {siteConfig.navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
