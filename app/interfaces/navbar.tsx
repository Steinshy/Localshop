// Interface
import { UserContextType } from '@interfaces/subProviders';
import { CartContextType } from '@interfaces/subProviders';

// Components => Layout => UserDropdown
type UserMenuProps = {
  userStore: UserContextType;
  cartStore: CartContextType;
  isLogged: () => boolean;
  firstname: string;
  lastname: string;
};

export type { UserMenuProps };
