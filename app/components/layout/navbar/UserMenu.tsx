"use client";

// React
import { FC, useState } from "react";

// NextJS
import { useRouter } from "next/navigation";

// NextUI
import { Button, Avatar, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown } from "@nextui-org/react";

// Icon
import { FaChevronDown, FaUserCog, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";

// Utils
import { showToast } from "@utils/helpers";

// Interface
import { UserMenuProps } from "@interfaces/navbar";

const UserMenu: FC<UserMenuProps> = ({ userStore, cartStore, isLogged, firstname, lastname }) => {
  const router = useRouter();
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
          showToast("You has been logged out!", "success");
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
    showToast("You has been logged in!", "success");
  };

  const menuItems = [
    { key: "profile", label: "Profile", icon: <FaUserCog /> },
    { key: "addresses", label: "Addresses", icon: <FaShoppingBag /> },
    { key: "orders", label: "Orders", icon: <FaShoppingBag /> },
    { key: "settings", label: "Settings", icon: <FaUserCog /> },
    { key: "logout", label: "Logout", icon: <FaSignOutAlt /> },
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
        {menuItems.map(({ key, label, icon }) => (
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
