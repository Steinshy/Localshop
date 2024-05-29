type NavbarProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

type UserDropdownProps = {
  lastname: string;
  firstname: string;
  handleUserMenuOpen: (bool: boolean) => void;
  isUserMenuOpen: boolean;
  handleUserKeySelection: (value: React.Key) => void;
};

export type { NavbarProps, UserDropdownProps };
