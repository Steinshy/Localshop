'use client';

import { useContext } from 'react';
import { UserContext } from '@utils/subProviders';
import { redirect } from 'next/navigation';

const UserPage = () => {
  const userStore = useContext(UserContext);
  const { isLogged } = userStore;
  
  if (!isLogged()) {
    return redirect('/');
  }
  return redirect('/user/profile');
};

export default UserPage;
