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
import Header from '@components/layout/header';
import Footer from '@components/layout/footer';
import Breadcrumb from '@components/layout/breadCrumb';

// Providers
import Providers from './providers';

// Interfaces
import { LayoutProps } from '@interfaces/general';

// Actions
import { getUser } from '@actions/actionsUser';
import { getCart } from '@actions/actionsCart';
import { getProductCategories } from '@actions/actionsProducts';

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

export const dynamic = 'force-dynamic'

const RootLayout: FC<LayoutProps> = async ({ children }) => {
  const { data: userData, error: userError } = await getUser(),
        { data: cartData } = await getCart(),
        { data: categoriesData } = await getProductCategories(),
    requestUrl = headers().get('x-url') as string|undefined;

  if (userError && requestUrl !== '/') {
    if (isPrivateUrl(requestUrl)) return redirect('/');
  }

  return (
    <html lang='en'>
      <body className='flex flex-col min-h-svh'>
        <main className='flex flex-col flex-grow'>
          <Providers initialUser={userData} initialCart={cartData}>
            <Header categories={categoriesData} />
            <Breadcrumb requestUrl={requestUrl} />
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
