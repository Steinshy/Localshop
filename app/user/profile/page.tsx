// NextJS
import { Metadata } from 'next';

// Components
import Breadcrumb from "@components/layout/breadCrumb";
import AvatarForm from "@components/user/profile/avatarForm";
import { breadCrumbItems } from "@components/layout/breadCrumbItems";

// Utils
import GeneralForm from "@components/user/profile/generalForm";
import PasswordForm from "@components/user/profile/passwordForm";

export const metadata: Metadata = { title: 'Profile' };

const ProfilePage = () => {

  return (
    <>
      <Breadcrumb items={breadCrumbItems.user('Profile')} />
      <h1 className="text-2xl mb-2">Profile</h1>

      <div className='flex flex-col gap-2'>
        <AvatarForm />
        <GeneralForm />
        <PasswordForm />
      </div>
    </>
  );
}

export default ProfilePage;
