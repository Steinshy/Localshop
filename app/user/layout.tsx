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

  if (userStore.data.attributes.id === 0) {
    redirect('/');
  }

  return <div className='max-w-screen-2xl flex flex-col flex-grow my-8'>{children}</div>;
}
