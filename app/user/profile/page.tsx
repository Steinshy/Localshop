// React
import { FC } from "react";

// Components
import Breadcrumb from "@/app/components/breadCrumb";

const ProfilePage:FC = () => {
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Profile" }];

  return (
    <div className="max-w-screen-md mx-auto w-full">
      <Breadcrumb items={breadCrumbItems} />
      <h1 className="text-2xl mb-2">Profile</h1>
    </div>
  );
}

export default ProfilePage;
