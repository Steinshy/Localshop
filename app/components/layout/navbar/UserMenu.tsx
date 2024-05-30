'use client';

// React
import { FC, useContext, useState } from "react";

// NextJS
import { useRouter, usePathname } from "next/navigation";

// NextUI
import { Button, Avatar, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown, Divider } from "@nextui-org/react";

// Icon
import { FaChevronDown, FaRegUserCircle, FaUserCog, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";

// Utils
import { UserContext, CartContext } from "@utils/subProviders";

const UserMenu:FC = () => {
  const router = useRouter(),
        pathname = usePathname(),
        userStore = useContext(UserContext),
        cartStore = useContext(CartContext);
  const { data, isLogged } = userStore;
  const { attributes } = data || {};
  const { firstname, lastname } = attributes || {};

  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);

  const handleUserMenu = (value: React.Key): void => {
    // Dosn't work
    if (value === "logout") {
      if (pathname.match(/user\/.*/)) router.push("/");
      return userStore.logout();
    }
    router.push(`/user/${value}`);
  };

  const handleUserMenuOpen = (bool:boolean) => {
    setIsUserMenuOpen(bool);
  };

  const handleUserLogin = () => {
    // Click on login => Refresh data from subprovider refresh const
    void userStore.refresh();
    void cartStore.refresh();
  };

  console.log(isLogged());

  return (
    !isLogged() ? (
      <Button variant="solid" radius="sm" color="primary" size="sm" onClick={handleUserLogin}>
        <span className="font-semibold">Login</span>
      </Button>
    ) : (
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
              {lastname} {firstname}
            </span>
          </Button>
        </DropdownTrigger>
        <DropdownMenu onAction={handleUserMenu} aria-label="Profile Actions" variant="flat">
          <DropdownItem startContent={<FaRegUserCircle />} key="profile" textValue="profile">
            Profile
          </DropdownItem>
          <DropdownItem startContent={<FaShoppingBag />} key="addresses" textValue="addresses">
            Addresses
          </DropdownItem>
          <DropdownItem startContent={<FaShoppingBag />} key="orders" textValue="order">
            Orders
          </DropdownItem>
          <DropdownItem startContent={<FaUserCog />} key="settings" textValue="settings">
            Settings
          </DropdownItem>
          <DropdownItem>
            <Divider />
          </DropdownItem>
          <DropdownItem
            startContent={<FaSignOutAlt />}
            key="logout"
            textValue="logout"
            className="text-danger"
            color="danger"
          >
            Logout
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  );
};

export default UserMenu;
