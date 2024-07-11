'use client';

// React
import { useContext, useState, useEffect } from 'react';

// NextJS
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';

// NextUI
import { Link as NextLink, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, NavbarContent, NavbarItem,
         Navbar, Button, Badge, Dropdown, DropdownMenu, DropdownTrigger, DropdownItem } from '@nextui-org/react';

// Icons
import { FaCartArrowDown, FaChevronDown } from 'react-icons/fa';

// Utils
import { CartContext, UserContext } from '@utils/subProviders';

// Components
import UserDropdown from '@components/layout/userDropdown';

// Actions
import { getProductCategories } from '@actions/actionsProducts';

// Interfaces
import { CategoryProps } from '@interfaces/categories';

const Header = () => {
  const navItems = [
    { key: 'home', href: '/', label: 'Home' },
    { key: 'products', href: '/products', label: 'Products' },
    { key: 'about', href: '/about', label: 'About Us' },
  ],
  router = useRouter(),
  pathname = usePathname(),
  cartStore = useContext(CartContext),
  userStore = useContext(UserContext);

  // Categories
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState<boolean>(false),
        [categories, setCategories] = useState<CategoryProps[]>([]);
  const handleCategoryAction = (key: React.Key) => {
    setIsCategoriesMenuOpen(false);
    void router.push(`/products/${key}`);
  };
  const handleCategoriesMenuOpen = (isOpen: boolean) => {
    setIsCategoriesMenuOpen(isOpen);
  };
  useEffect(() => {
    const apiFetch = async () => {
      const { data, error } = await getProductCategories();
      if (!error) setCategories(data);
    }

    void apiFetch();
  }, []);

  // Mobile Menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Dropdown key={item.key} onOpenChange={handleCategoriesMenuOpen}>
              <NavbarItem key={item.key} isActive={active(item)}>
                <DropdownTrigger>
                  <NextLink as={Link} color='foreground' href='#'>
                    {item.label}
                    <FaChevronDown className={`ml-1 transition-transform	${isCategoriesMenuOpen ? 'rotate-180' : 'rotate-0'}`} />
                  </NextLink>
                </DropdownTrigger>
              </NavbarItem>
              <DropdownMenu
                onAction={handleCategoryAction}
                classNames={{
                  list: 'grid grid-cols-3'
                }}
                itemClasses={{ base: "gap-4" }}
              >
                {categories.map((category) => (
                  <DropdownItem key={category.attributes.slug} description='Description'>
                    {category.attributes.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          ) : (
            <NavbarItem key={item.key} isActive={active(item)}>
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
  );
};

export default Header;
