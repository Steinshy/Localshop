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
import { UserMenuProps } from '@interfaces/navbar';

// Actions
import { userLogin } from 'actions';

const UserDropdown: FC<UserMenuProps> = ({ userStore, cartStore, isLogged, firstname, lastname }) => {
  const router = useRouter();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const handleUserAction = (key: React.Key) => {
    if (key === 'logout') {
      void handleUserLogout();
      return;
    }
    setIsUserMenuOpen(false);
    router.push(`/user/${key}`);
  };

  const handleUserMenuOpen = (isOpen: boolean) => {
    setIsUserMenuOpen(isOpen);
  };

  const handleUserLogout = () => {
    if (!isLogged()) return;

    void userStore.logout();
    void cartStore.reset();
    setIsUserMenuOpen(false);
    showToast('You have been logged out!', 'success');
  };

  const handleUserLogin = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const ApiCall = async () => {
      const { error } = await userLogin();
      if (error) return showToast('Login failed!', 'error');

      const [userResponse, cartResponse] = await Promise.all([userStore.refresh(), cartStore.refresh()]);
      if (Boolean(userResponse) && Boolean(cartResponse)) {
        showToast('You have been logged in!', 'success');
      } else {
        showToast('Login failed!', 'error');
      }
    };

    void ApiCall();
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
          <span className='hidden sm:inline'>{lastname} {firstname}</span>
        </Button>
      </DropdownTrigger>
      <DropdownMenu onAction={handleUserAction} aria-label='Profile Actions' variant='flat'>
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
