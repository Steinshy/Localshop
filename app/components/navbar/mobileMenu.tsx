// React
import { FC } from 'react';

// NextJS
import Link from 'next/link';

// NextUI
import { Link as NextLink, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent } from '@nextui-org/react';

// Interfaces
import { MobileMenuProps } from '@interfaces/general';

const MobileMenu: FC<MobileMenuProps> = ({ navItems, isMobileMenuOpen, handleMobileMenu, isItemActive }) => {
  return (
    <>
      <NavbarContent className='sm:hidden' justify='start'>
        <NavbarMenuToggle aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} />
      </NavbarContent>

      <NavbarMenu>
        {navItems.map((item) => (
          <NavbarMenuItem key={item.key} isActive={isItemActive(item)}>
            <NextLink as={Link} className='w-full' color='foreground' href={item.href} onPress={handleMobileMenu}>
              {item.label}
            </NextLink>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </>
  );
};

export default MobileMenu;
