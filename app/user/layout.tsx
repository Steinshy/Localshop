'use client';

// React
import { FC, useContext } from 'react';

// NextJS
import { redirect } from 'next/navigation';

// Interfaces
import { LayoutProps } from '@interfaces/general';
import { UserContext } from '@providers/userProvider';

const UserLayout: FC<LayoutProps> = ({ children }) => {
  const userStore = useContext(UserContext);
  if (!userStore.isLogged) redirect('/');

  return (
    <div className="max-w-screen-md mx-auto w-full flex flex-col items-center flex-grow my-8 px-2">
      <div className="flex flex-col flex-grow w-full">{children}</div>
    </div>
  );
};

export default UserLayout;
