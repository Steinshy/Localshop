'use client';

// React
import { FC, useContext, useState } from 'react';

// NextJS
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// NextUI
import { Link as NextLink, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem,
         Navbar, Button, Badge } from '@nextui-org/react';

// Icons
import { FaCartArrowDown } from 'react-icons/fa';

// Utils
import { CartContext, UserContext } from '@utils/subProviders';

// Components
import UserDropdown from '@components/layout/userDropdown';

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

  // Categories
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState<boolean>(false);

  // Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  // Cart
  const { data: { attributes: { totalItems } } } = cartStore;
  const cartTotal = totalItems || 0;
  const { isLogged } = userStore;

  const active = (item:{ [key:string]:string }) => {
    return item.href !== '/' ? pathname.includes(item.href) : pathname === item.href;
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
    <div className='relative'>
      <Navbar isBlurred isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent className='hidden sm:flex' justify='start'>
          <p className='ml-1 font-light'>Localshop</p>
        </NavbarContent>

        <NavbarContent className="sm:hidden" justify="start">
          <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
        </NavbarContent>

        <NavbarMenu>
          {navItems.map((item) => (
            <NavbarMenuItem key={item.key} isActive={active(item)}>
              <NextLink as={Link} className='w-full' color='foreground' href={item.href} onPress={closeMenu}>
                {item.label}
              </NextLink>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>

        <NavbarContent className='hidden sm:flex' justify='center'>
          {navItems.map((item) => (
            item.key === 'products' ? (
              <NavbarItem key={item.key} isActive={active(item)} onMouseEnter={() => setIsCategoriesMenuOpen(true)}>
                <NextLink as={Link} color='foreground' href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            ) : (
              <NavbarItem key={item.key} isActive={active(item)} onMouseEnter={() => setIsCategoriesMenuOpen(false)}>
                <NextLink as={Link} color='foreground' href={item.href}>
                  {item.label}
                </NextLink>
              </NavbarItem>
            )
          ))}
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
      <div
        className={`${isCategoriesMenuOpen ? 'translate-y-0 opacity-1' : '-translate-y-full opacity-0 invisible'} z-[39] top-[65px] transition-all duration-500 ease-in-out absolute bg-background shadow-lg w-full flex justify-center p-2`}
        onMouseLeave={() => setIsCategoriesMenuOpen(false)}
      >
        <div className='grid grid-cols-4 md:grid-cols-6 gap-3 py-3'>
          {categories.map((category) => (
            <div key={category.id}>
              <NextLink
                href={`/products/${category.attributes.slug}`}
                onPress={() => setIsCategoriesMenuOpen(false)}
                color='foreground'
              >
                {category.attributes.title}
              </NextLink>
              <p className='text-sm text-foreground/50'>Description</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
