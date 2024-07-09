'use client';

// React
import { useContext, useState } from 'react';

// NextJS
import { usePathname } from 'next/navigation';
import Link from 'next/link';

// NextUI
import { Link as NextLink, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem,
         Navbar, Button, Badge, 
         LinkIcon} from '@nextui-org/react';

// Icons
import { FaCartArrowDown } from 'react-icons/fa';

// Utils
import { CartContext, UserContext } from '@utils/subProviders';

// Components
import UserDropdown from '@components/layout/userDropdown';

const Header = () => {
  const navItems = [
    { key: 'home', href: '/', label: 'Home' },
    { key: 'products', href: '/products', label: 'Products' },
    { key: 'about', href: '/about', label: 'About Us' },
  ],
  pathname = usePathname(),
  cartStore = useContext(CartContext),
  userStore = useContext(UserContext);

  // Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Cart
  const { data: { attributes: { totalItems } } } = cartStore;
  const cartTotal = totalItems || 0;

  // User
  const { isLogged } = userStore;

  const active = (item:{ [key:string]:string }) => {
    return item.href !== '/' ? pathname.includes(item.href) : pathname === item.href;
  }

  const closeMenu = () => {
    setIsMenuOpen(false);
  }

  return (
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
          <NavbarItem key={item.key} isActive={active(item)}>
            <NextLink as={Link} color='foreground' href={item.href}>
              {item.label}
            </NextLink>
          </NavbarItem>
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
  );
};

export default Header;
