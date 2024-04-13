// React
import { FC } from "react";

// NextJS
import { redirect } from 'next/navigation';

const UserPage:FC = () => {
  redirect('/user/profile');
}

export default UserPage;
