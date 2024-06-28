'use client';

// React
import { FC, useState } from 'react';

// NextJS
import { useRouter } from 'next/navigation';

// NextUI
import { Button, Avatar, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown } from '@nextui-org/react';

// Icons
import { FaChevronDown, FaUserCog, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';

// Utils
import { showToast } from '@utils/helpers';

// Interfaces
import { UserMenuProps } from "@interfaces/navbar";

const UserDropdown: FC<UserMenuProps> = ({ userStore, cartStore, isLogged, firstname, lastname }) => {
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleUserMenu = (key: React.Key) => {
      if (key === 'logout') {
        return handleUserLoginOut();
      }
      router.push(`/user/${key}`);
      setIsUserMenuOpen(false);
    };

  const handleUserMenuOpen = (isOpen: boolean) => {
    setIsUserMenuOpen(isOpen);
  };

  const handleUserLoginOut = () => {
    if (userStore.data && isLogged()) {
      return (
        void userStore.logout(),
        void cartStore.reset(),
        setIsUserMenuOpen(false),
        showToast('You have been logged out!', 'success'),
        router.push('/')
      );
    }
    showToast('Logout failed!', 'error');
  };

  const handleUserLogin = () => {
    void userStore.refresh();
    void cartStore.refresh();
    setIsUserMenuOpen(false);
    showToast('You have been logged in!', 'success');
    if (!userStore.data && !isLogged()) {
      setIsUserMenuOpen(false);
      showToast('Login failed!', 'error');
    }
  };

  return !isLogged() ? (
    <Button variant='solid' radius='sm' color='primary' size='sm' onClick={handleUserLogin}>
      Login
    </Button>
  ) : (
    <Dropdown placement='bottom-end' onOpenChange={handleUserMenuOpen}>
      <DropdownTrigger>
        <Button
          variant='light'
          className='pl-1'
          radius='full'
          startContent={
            <Avatar
              isBordered
              className='transition-transform'
              color='primary'
              size='sm'
              src='https:i.pravatar.cc/150?u=a042581f4e29026704d'
            />
          }
          endContent={<FaChevronDown className={`transition-transform	${isUserMenuOpen ? 'rotate-180' : 'rotate-0'}`} />}
        >
          {lastname} {firstname}
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleUserMenu} aria-label='Profile Actions' variant='flat'>
        <DropdownItem key='profile'>
          <div className='flex items-center gap-2'>
            <FaUserCog />
            Profile
          </div>
        </DropdownItem>
        <DropdownItem key='addresses'>
          <div className='flex items-center gap-2'>
            <FaShoppingBag />
            Addresses
          </div>
        </DropdownItem>
        <DropdownItem key='orders'>
          <div className='flex items-center gap-2'>
            <FaShoppingBag />
            Orders
          </div>
        </DropdownItem>
        <DropdownItem key='settings'>
          <div className='flex items-center gap-2'>
            <FaUserCog />
            Settings
          </div>
        </DropdownItem>
        <DropdownItem key='logout'>
          <div className='flex items-center gap-2'>
            <FaSignOutAlt />
            Logout
          </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default UserDropdown;
