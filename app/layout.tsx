// React
import { FC } from "react";

// Modules
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@components/layout/navbar";
import Footer from "@components/layout/footer";
import CableComponent from "@components/cable";

// Providers
import Providers from "./providers";

// Interfaces
import { LayoutProps } from "@interfaces/general";

// Actions
import { getCart, getUser } from "actions";

// APP CSS
import "./styles/App.css";

const RootLayout: FC<LayoutProps> = async ({ children }) => {
  const { data:userData } = await getUser(),
        { data:cartData } = await getCart();

  return (
    <html lang="en" title="LocalShop">
      <body className="flex flex-col min-h-svh">
        <main className="flex flex-col flex-grow">
          <Providers initialUser={userData} initialCart={cartData}>
            <Navbar />
            {children}
            <CableComponent />
          </Providers>
          <Footer />
        </main>
        <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
      </body>
    </html>
  );
}


export default RootLayout;
