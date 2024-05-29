"use client";

// React
import { useContext, useState, FC } from "react";

// NextJS
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

import UserDropdown from "@components/layout/navbar"

// NextUI
import {
  Link as NextLink,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarItem,
  Navbar,
  Button,
  Badge,
} from "@nextui-org/react";

// Icons
import { DiCssdeck } from "react-icons/di";
import { FaCartArrowDown } from "react-icons/fa";

// Interfaces
import { NavbarProps } from "@interfaces/navbar";

//data
import { websiteName, navItems } from "@data/navbar";

// Utils
import { UserContext, CartContext } from "@utils/subProviders";
import ThemeSwitcher from "@utils/themeSwitcher";

const NavbarItemLink: FC<NavbarProps> = ({ href, isActive, children }) => {
  return (
    <NavbarItem isActive={isActive}>
      <NextLink as={Link} color="foreground" href={href}>
        {children}
      </NextLink>
    </NavbarItem>
  );
};

const Header = () => {
  const router = useRouter(),
    pathname = usePathname(),
    cartStore = useContext(CartContext),
    userStore = useContext(UserContext);
  console.log(userStore.data, "USER DATA");
  console.log(cartStore.data, "CART DATA");

  const { attributes: cartAttributes } = cartStore.data;
  const { totalItems } = cartAttributes;

  const { attributes: userAttributes } = userStore.data;
  const { lastname, firstname } = userAttributes ?? {};

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const handleUserLogout = (value: React.Key): void => {
    // Dosn't work
    if (value === "logout") {
      if (pathname.match(/user\/.*/)) router.push("/");
      return userStore.logout();
    }
    router.push(`/user/${value}`);
  };

  const handleUserLogin = async () => {
    // Click on login => Refresh data from subprovider refresh const
    void (await userStore.refresh(), cartStore.refresh());
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
          <p className="ml-1 font-light">{websiteName}</p>
        </NavbarItemLink>
        {navItems.map((item) => (
          <NavbarItemLink key={item.href} href={item.href} isActive={pathname === item.href}>
            {item.label}
          </NavbarItemLink>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {userStore.isLogged() ? (
          <NavbarItem>
            <UserDropdown lastname={lastname} firstname={firstname} handleUserMenuOpen={handleUserMenuOpen} isUserMenuOpen={isUserMenuOpen} handleUserLogout={handleUserLogout} />
          </NavbarItem>
        ) : (
          <NavbarItem>
            <Button variant="solid" radius="sm" color="primary" size="sm" onClick={handleUserLogin}>
              <span className="font-semibold">Login</span>
            </Button>
          </NavbarItem>
        )}

        <NavbarItem>
          <Badge
            content={totalItems > 0 ? totalItems : null}
            color="danger"
            placement="top-right"
            variant="shadow"
            isInvisible={totalItems === 0}
          >
            <Button
              startContent={<FaCartArrowDown className="text-2xl" />}
              as={Link}
              href="/order/cart"
              size="md"
              variant="ghost"
              radius="md"
            >
              Cart
            </Button>
          </Badge>
        </NavbarItem>
        <NavbarItem key="themswitcher">
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.href}>
            <Link href={item.href} onClick={() => setIsMenuOpen(false)}>
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
