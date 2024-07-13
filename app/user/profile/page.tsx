// NextJS
import { Metadata } from 'next';

// Components
import AvatarForm from "@components/user/profile/avatarForm";

// Utils
import GeneralForm from "@components/user/profile/generalForm";
import PasswordForm from "@components/user/profile/passwordForm";

export const metadata: Metadata = { title: 'Profile' };

const ProfilePage = () => {

  return (
    <div className='flex flex-col flex-grow'>
      <h1 className='text-2xl mb-2'>Profile</h1>

      <div className='flex flex-col gap-2'>
        <AvatarForm />
        <GeneralForm />
        <PasswordForm />
      </div>
    </div>
  );
}

export default ProfilePage;
