'use client';

// React
import { useContext } from 'react';

// Navigate
import { redirect } from 'next/navigation';

// Interfaces
import { LayoutProps } from '@interfaces/general';

import { UserContext } from '@utils/subProviders';

export default function UserLayout({ children }: LayoutProps) {
  const userStore = useContext(UserContext);
  const { isLogged } = userStore;
  if (!isLogged) redirect('/');

  return (
    <div className='max-w-screen-md my-8 mx-auto w-full'>
      {children}
    </div>
  );
}
