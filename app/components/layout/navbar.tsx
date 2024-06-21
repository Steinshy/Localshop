"use client";

// React
import { useContext } from "react";

// NextJS
import Link from "next/link";

// NextUI
import { Link as NextLink, NavbarContent, NavbarItem, Navbar, Button, Badge } from "@nextui-org/react";

// Icons
import { FaCartArrowDown } from "react-icons/fa";

// Utils
import { CartContext, UserContext } from "@utils/subProviders";

// Components
import UserMenu from "@components/layout/navbar/userMenu";

const Header = () => {
  const navItems = [
    { key: "home", href: "/", label: "Home" },
    { key: "products", href: "/products", label: "Products" },
    { key: "about", href: "/about", label: "About Us" },
  ];

  // Cart
  const cartStore = useContext(CartContext);
  const data = cartStore.data
  const totalItems = data?.attributes?.totalItems || 0
  console.log(data, "cartStore data")
  console.log(totalItems, "totalItems")
  // User
  const userStore = useContext(UserContext);
  const { data: { attributes: { firstname, lastname} }, isLogged } = userStore;

  return (
    <Navbar isBlurred isBordered>
      <NavbarContent className="flex" justify="start">
        <p className="ml-1 font-light">Localshop</p>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        {navItems.map((item) => (
          <NavbarItem key={item.key}>
            <NextLink as={Link} color="foreground" href={item.href}>
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        {isLogged() ? (
          <NavbarItem>
            <Badge
              content={totalItems}
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
        ) : null}

        <NavbarItem>
          <UserMenu
            userStore={userStore}
            cartStore={cartStore}
            isLogged={isLogged}
            firstname={firstname}
            lastname={lastname}
          />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
