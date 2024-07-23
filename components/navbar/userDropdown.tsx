'use client';

// React
import { useContext } from 'react';

// NextUI
import { Button } from '@nextui-org/react';

// Providers
import { CartContext } from '@providers/cartProvider';
import { UserContext } from '@providers/userProvider';

// Utils
import { showToast } from '@utils/helpers';

// Actions
import { userLogin } from '@actions/actionsUser';

// Components
import UserLoggedDropdown from './userLoggedDropdown';

const UserDropdown = () => {
  const userStore = useContext(UserContext),
    cartStore = useContext(CartContext);

  const handleUserLogin = () => {
    const checkLogin = async () => {
      const { error } = await userLogin();
      if (error) {
        showToast('Login failed', 'error');
      } else {
        void userStore.refresh();
        void cartStore.refresh();
        showToast('You have been logged in!', 'success');
      }
    };
    void checkLogin();
  };

  return !userStore.isLogged() ? (
    <Button variant="solid" radius="sm" color="primary" size="sm" onClick={handleUserLogin}>
      Login
    </Button>
  ) : (
    <UserLoggedDropdown />
  );
};

export default UserDropdown;
