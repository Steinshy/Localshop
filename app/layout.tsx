// React
import { FC } from "react";

// Modules
import { Toaster } from "react-hot-toast";

// Components
import Navbar from "@components/layout/navbar";
import Footer from "@components/layout/footer";

// Providers
import Providers from "./providers";

// Interface
import { LayoutProps } from "@interfaces/general";

// APP CSS
import "./styles/App.css";

const RootLayout: FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <body className="flex flex-col min-h-svh">
      <main className="flex flex-col flex-grow">
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Footer />
      </main>
      <Toaster position="top-center" toastOptions={{ duration: 2000 }} />
    </body>
  </html>
);

export default RootLayout;
