// React
import { FC } from "react";

// NextUI
import { Button, Avatar, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown, Divider } from "@nextui-org/react";

// Icon
import { FaChevronDown, FaRegUserCircle, FaUserCog, FaShoppingBag, FaSignOutAlt } from "react-icons/fa";

// Interface
import { UserDropdownProps } from "@interfaces/navbar";

const UserDropdown: FC<UserDropdownProps> = ({ lastname, firstname, handleUserMenuOpen, isUserMenuOpen, handleUserLogout }) => {
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
            {lastname} {firstname}
          </span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleUserLogout} aria-label="Profile Actions" variant="flat">
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
  );
};

export default UserDropdown;
