'use client';

// React
import { useState, useContext, useCallback } from 'react';

// NextJS
import { usePathname, useRouter } from 'next/navigation';

// NextUI
import { Button, Avatar, DropdownTrigger, DropdownMenu, DropdownItem, Dropdown } from '@nextui-org/react';

// Icons
import { FaChevronDown, FaUserCog, FaShoppingBag, FaSignOutAlt } from 'react-icons/fa';

// subProviders
import { CartContext } from '@subProviders/cartProvider';
import { UserContext } from '@subProviders/userProvider';

// Utils
import { isPrivateUrl, showToast } from '@utils/helpers';

const UserLoggedDropdown = () => {
  const user = useContext(UserContext), cart = useContext(CartContext);
  if (!user.data) return null;

  const router = useRouter(), pathname = usePathname();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState<boolean>(false);
  const { data: { attributes: { firstname, lastname, avatar: { small } } } } = user;

  const handleUserAction = (actionKey: React.Key) => {
      setIsUserMenuOpen(false);
      if (actionKey === 'logout') {
        handleUserLogout();
      } else router.push(`/user/${actionKey}`);
    };

  const handleUserMenuOpen = useCallback((isOpen: boolean) => {
    setIsUserMenuOpen(isOpen);
  }, []);

  const handleUserLogout = () => {
    void user.logout();
    void cart.reset();
    setIsUserMenuOpen(false);
    if (isPrivateUrl(pathname)) {
      return router.push('/');
    }
    showToast('You have been logged out!', 'success');
  }


  return (
    <Dropdown placement='bottom-end' onOpenChange={handleUserMenuOpen}>
      <DropdownTrigger>
        <Button
          variant='light'
          className='pl-1'
          radius='full'
          startContent={<Avatar isBordered className='transition-transform' color='primary' size='sm' src={small} />}
          endContent={<FaChevronDown className={`transition-transform	${isUserMenuOpen ? 'rotate-180' : 'rotate-0'}`} />}
        >
          <span className='hidden sm:inline'>
            {lastname} {firstname}
          </span>
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

export default UserLoggedDropdown;
