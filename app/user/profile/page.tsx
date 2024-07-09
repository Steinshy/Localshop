// NextJS
import { Metadata } from 'next';

// Components
import Breadcrumb from "@components/layout/breadCrumb";
import AvatarForm from "@components/user/profile/avatarForm";

// Utils
import GeneralForm from "@components/user/profile/generalForm";
import PasswordForm from "@components/user/profile/passwordForm";

export const metadata: Metadata = {
  title: 'Profile'
};

const ProfilePage = () => {
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Profile" }];

  return (
    <>
      <Breadcrumb items={breadCrumbItems} />
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
