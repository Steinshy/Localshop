// React
import { FC } from 'react';

// NextJS
import { Metadata } from 'next';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

// Modules
import { Toaster } from 'react-hot-toast';

// Components
import CableComponent from '@components/cable';
import Navbar from '@components/layout/navbar';
import Footer from '@components/layout/footer';

// Providers
import Providers from './providers';

// Interfaces
import { LayoutProps } from '@interfaces/general';

// Actions
import { getUser } from '@actions/actionsUser';
import { getCart } from '@actions/actionsCart';

// Utils
import { isPrivateUrl } from '@utils/helpers';

// CSS
import './styles/App.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Localshop',
    default: 'Localshop',
  },
};

const RootLayout: FC<LayoutProps> = async ({ children }) => {
  const { data: userData, error: userError } = await getUser(),
        { data: cartData } = await getCart(),
    requestUrl = headers().get('x-url');

  if (userError && requestUrl !== '/') {
    if (isPrivateUrl(requestUrl)) return redirect('/');
  }

  return (
    <html lang='en' title='LocalShop'>
      <body className='flex flex-col min-h-svh'>
        <main className='flex flex-col flex-grow'>
          <Providers initialUser={userData} initialCart={cartData}>
            <Navbar />
            {children}
            <CableComponent />
          </Providers>
          <Footer />
        </main>
        <Toaster position='top-center' toastOptions={{ duration: 2000 }} />
      </body>
    </html>
  );
};

export default RootLayout;
