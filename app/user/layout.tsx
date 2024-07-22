'use client';

// React
import { useContext } from 'react';

// Navigate
import { redirect } from 'next/navigation';

// Interfaces
import { LayoutProps } from '@interfaces/general';
import { UserContext } from '@subProviders/userProvider';

export default function UserLayout({ children }: LayoutProps) {
  const userStore = useContext(UserContext);
  const { isLogged } = userStore;
  if (!isLogged) redirect('/');

  return (
    <div className='max-w-screen-md mx-auto w-full flex flex-col items-center flex-grow my-8 px-2'>
      <div className='flex flex-col flex-grow w-full'>{children}</div>
    </div>
  );
}
