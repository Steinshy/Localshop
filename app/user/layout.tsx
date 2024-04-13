// React
import { FC } from "react";

// Interfaces
import { LayoutProps } from "../interfaces/general";

const UserLayout: FC<LayoutProps> = ({ children }) => {
  return <div className="max-w-screen-2xl flex flex-col flex-grow my-8">{children}</div>;
};

export default UserLayout;
