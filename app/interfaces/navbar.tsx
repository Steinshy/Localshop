type NavbarProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

type CartBadgeProps = {
  quantity: number;
};

type UsermenuLoggedProps = {
  userLastName: string;
  userFirstName: string;
  handleUserMenuOpen: (bool: boolean) => void;
  isUserMenuOpen: boolean;
  handleUserKeySelection: (value: React.Key) => void;
};

type UsermenuNotLoggedProps = {
  handleUserLogin: () => void;
};

export type {
  NavbarProps,
  CartBadgeProps,
  UsermenuLoggedProps,
  UsermenuNotLoggedProps
}
