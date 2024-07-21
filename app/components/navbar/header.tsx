'use client';

// React
import { FC, useContext, useState } from 'react';

// NextJS
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// NextUI
import { Link as NextLink, NavbarContent, NavbarItem, Navbar, Button, Badge } from '@nextui-org/react';

// Icons
import { FaCartArrowDown } from 'react-icons/fa';
import { FaAppleWhole } from 'react-icons/fa6';

// subProviders
import { CartContext } from '@subProviders/cartProvider';
import { UserContext } from '@subProviders/userProvider';

// Components
import UserDropdown from '@components/navbar/userDropdown';
import CategoriesMenu from '@components/navbar/categoriesMenu';
import MobileMenu from '@components/navbar/mobileMenu';

// Interfaces
import { HeaderProps } from '@interfaces/general';

const Header: FC<HeaderProps> = ({ categories }) => {
  const navItems = [
      { key: 'home', href: '/', label: 'Home' },
      { key: 'products', href: '/products', label: 'Products' },
      { key: 'about', href: '/about', label: 'About Us' },
    ],
    pathname = usePathname(),
    cartStore = useContext(CartContext),
    userStore = useContext(UserContext);

  // Categories - Mobile Menu
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // Cart
  const cartTotal = cartStore?.data?.attributes?.totalItems || 0;
  const { isLogged } = userStore;

  const isItemActive = (item: { [key: string]: string }) => {
    return item.href !== '/' ? pathname.includes(item.href) : pathname === item.href;
  };

  const handleMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCategoriesMenu = (isOpen: boolean) => {
    setIsCategoriesMenuOpen(isOpen);
  };

  return (
    <div className='relative'>
      <Navbar isBlurred={false} isBordered isMenuOpen={isMobileMenuOpen} onMenuOpenChange={setIsMobileMenuOpen}>
        <NavbarContent className='hidden sm:flex' justify='start'>
          <NextLink as={Link} href='/'>
            <div className='text-lg flex justify-center items-center my-8'>
              <div className='bg-white rounded-s-lg text-black p-1 relative flex items-center'>
                L<FaAppleWhole className='text-md inline' />
                CAL
              </div>
              <div className='bg-black text-white p-1 rounded-e-lg'>SHOP</div>
            </div>
          </NextLink>
        </NavbarContent>

        {/* MobileMenu */}
        <MobileMenu
          isMobileMenuOpen={isMobileMenuOpen}
          handleMobileMenu={handleMobileMenu}
          navItems={navItems}
          isItemActive={isItemActive}
        />

        <NavbarContent className='hidden sm:flex' justify='center'>
          {navItems.map((item) =>
            item.key === 'products' ? (
              <NavbarItem key={item.key} isActive={isItemActive(item)} onMouseEnter={() => handleCategoriesMenu(true)}>
                <NextLink as={Link} color='foreground' href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            ) : (
              <NavbarItem key={item.key} isActive={isItemActive(item)} onMouseEnter={() => handleCategoriesMenu(false)}>
                <NextLink as={Link} color='foreground' href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            )
          )}
        </NavbarContent>

        <NavbarContent justify='end'>
          {isLogged() && (
            <NavbarItem>
              <Badge
                content={cartTotal}
                color='danger'
                placement='top-right'
                variant='shadow'
                isInvisible={cartTotal <= 0}
              >
                <Button
                  startContent={<FaCartArrowDown className='text-2xl' />}
                  as={Link}
                  href='/order'
                  size='md'
                  variant='ghost'
                  radius='md'
                >
                  Cart
                </Button>
              </Badge>
            </NavbarItem>
          )}

          <NavbarItem>
            <UserDropdown />
          </NavbarItem>
        </NavbarContent>
      </Navbar>
      
      {/* CategoriesMenu */}
      <div
        className={`${
          isCategoriesMenuOpen ? 'translate-y-0 opacity-1' : '-translate-y-full opacity-0 invisible'
        } z-[39] top-[65px] transition-all duration-500 ease-in-out absolute bg-background shadow-lg w-full flex justify-center p-2`}
        onMouseLeave={() => handleCategoriesMenu(false)}
      >
        <div className='grid grid-cols-4 md:grid-cols-6 gap-3 py-3'>
          <CategoriesMenu handleCategoriesMenu={handleCategoriesMenu} categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default Header;
