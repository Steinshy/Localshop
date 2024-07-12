// NextJS
import { Metadata } from 'next';

// Components
import ThemeSwitcher from "@utils/themeSwitcher";
import Breadcrumb from "@components/layout/breadCrumb";
import { breadCrumbItems } from '@components/layout/breadCrumbItems';

// NextUi
import { Card, CardBody, CardHeader } from '@nextui-org/react';

export const metadata: Metadata = { title: 'Settings' };

const SettingsPage = () => {

  return (
    <>
      <Breadcrumb items={breadCrumbItems.user('Settings')} />
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
