// NextJS
import { Metadata } from 'next';

// Components
import ThemeSwitcher from "@utils/themeSwitcher";
import Breadcrumb from "@components/layout/breadCrumb";
import { Card, CardBody, CardHeader } from '@nextui-org/react';

export const metadata: Metadata = {
  title: 'Settings'
};

const SettingsPage = () => {
  const breadCrumbItems = [{ title: "User", href: "/user" }, { title: "Settings" }];

  return (
    <>
      <Breadcrumb items={breadCrumbItems} />
      <Card>
        <CardHeader>
          Theme
        </CardHeader>
        <CardBody>
          <div className='flex justify-between items-center'>
            <p>Dark Mode</p>
            <ThemeSwitcher />
          </div>
        </CardBody>
      </Card>
    </>
  );
}

export default SettingsPage;
