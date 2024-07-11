// NextJS
import { redirect } from 'next/navigation';

const UserPage = () => {
  return redirect('/user/profile');
};

export default UserPage;
