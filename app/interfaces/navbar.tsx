type NavbarProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

type UsermenuLoggedProps = {
  userLastName: string;
  userFirstName: string;
  handleUserMenuOpen: (bool: boolean) => void;
  isUserMenuOpen: boolean;
  handleUserKeySelection: (value: React.Key) => void;
};

export type { NavbarProps, UsermenuLoggedProps };
