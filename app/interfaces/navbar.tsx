// Interface
import { UserContextType } from "@interfaces/user";
import { CartContextType } from "@interfaces/cart";

type NavbarProps = {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
};

type UserMenuProps = {
  userStore: UserContextType;
  cartStore: CartContextType;
  isLogged: () => boolean;
  firstname: string;
  lastname: string;
};

export type { NavbarProps, UserMenuProps };
