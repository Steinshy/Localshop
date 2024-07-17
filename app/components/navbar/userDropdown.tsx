'use client';

// React
import { useContext, useCallback } from 'react';

// NextUI
import { Button } from '@nextui-org/react';

// subProviders
import { CartContext } from '@subProviders/cartProvider';
import { UserContext } from '@subProviders/userProvider';

// Utils
import { showToast } from '@utils/helpers';

// Actions
import { userLogin } from '@actions/actionsUser';

// Components
import UserLoggedDropdown from './userLoggedDropdown';

const UserDropdown = () => {
  const userStore = useContext(UserContext),
    cartStore = useContext(CartContext);
  const { isLogged } = userStore;

  const handleUserLogin = () => {
    const checkLogin = async () => {
      const { error } = await userLogin();
      if (error) {
        showToast("Login failed", 'error');
      } else {
        userStore.refresh();
        cartStore.refresh();
        showToast('You have been logged in!', 'success');
      }
    };
    void checkLogin();
  };

  return !isLogged() ? (
    <Button variant='solid' radius='sm' color='primary' size='sm' onClick={handleUserLogin}>
      Login
    </Button>
  ) : (
    <UserLoggedDropdown />
  );
};

export default UserDropdown;
