"use client";

// React
import { FC, useContext, useState } from "react";

// NextJS
import { useRouter, usePathname } from "next/navigation";

// NextUI
import { Button, Avatar, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown, Divider } from "@nextui-org/react";

// Icon
import { FaChevronDown, FaUserCog, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";

// Utils
import { UserContext, CartContext } from "@utils/subProviders";
import { showToast } from "@utils/helpers";

const UserMenu = () => {
  const router = useRouter(),
    userStore = useContext(UserContext),
    cartStore = useContext(CartContext);
  const { data, isLogged } = userStore;
  const { attributes } = data || {};
  const { firstname, lastname } = attributes || {};

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserMenu = (key: React.Key) => {
    const menuItem = menuItems.find((item) => item.key === key);
    if (menuItem) {
      switch (menuItem.key) {
        case "profile":
          router.push("/user/profile");
          break;
        case "addresses":
          router.push("/user/addresses");
          break;
        case "orders":
          router.push("/user/orders");
          break;
        case "settings":
          router.push("/user/settings");
          break;
        case "logout":
          void userStore.logout();
          void cartStore.reset();
          break;
        default:
          break;
      }
    }
  };

  const handleUserMenuOpen = (isOpen: boolean) => {
    setIsUserMenuOpen(isOpen);
  };

  const handleUserLogin = () => {
    void userStore.refresh();
    void cartStore.refresh();
    showToast("Logged in!", "success");
  };

  const menuItems = [
    { label: "Profile", key: "profile", icon: <FaUserCog /> },
    { label: "Addresses", key: "addresses", icon: <FaShoppingBag /> },
    { label: "Orders", key: "orders", icon: <FaShoppingBag /> },
    { label: "Settings", key: "settings", icon: <FaUserCog /> },
    { label: "Logout", key: "logout", icon: <FaSignOutAlt /> },
  ];

  return !isLogged() ? (
    <Button variant="solid" radius="sm" color="primary" size="sm" onClick={handleUserLogin}>
      Login
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
          endContent={<FaChevronDown className={`transition-transform	${isUserMenuOpen ? "rotate-180" : "rotate-0"}`} />}
        >
          {lastname} {firstname}
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={(key) => handleUserMenu(key)} aria-label="Profile Actions" variant="flat">
        {menuItems.map(({ label, key, icon }) => (
          <DropdownItem key={key}>
            <div className="flex items-center gap-2">
              {icon}
              {label}
            </div>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserMenu;
