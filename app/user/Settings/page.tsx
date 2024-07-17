// NextJS
import { Metadata } from 'next';

// Components
import ThemeSwitcher from '@utils/themeSwitcher';

// NextUI
import { Card, CardBody, CardHeader } from '@nextui-org/react';

export const metadata: Metadata = { title: 'Settings' };

const SettingsPage = () => {
  return (
    <div className='flex flex-col flex-grow'>
      <h1 className='text-2xl mb-2'>Settings</h1>
      <Card>
        <CardHeader>Theme</CardHeader>
        <CardBody>
          <div className='flex justify-between items-center'>
            <p>Dark Mode</p>
            <ThemeSwitcher />
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default SettingsPage;
