// React
import { FC, ReactNode } from 'react';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout:FC<UserLayoutProps> = ({ children }) => {
  
  return (
    <div className="max-w-screen-2xl flex flex-col flex-grow items-center my-8">
      {children}
    </div>
  );
}

export default UserLayout;