// React
import { FC } from "react";

// Components
import Navbar from "@components/layout/navbar";
import Footer from "@components/layout/footer";

// Providers
import Providers from "./providers";

// Interface
import { LayoutProps } from "@interfaces/general";

// APP CSS
import "./styles/App.css";

// Next metadata
export const metadata = {
  title: "LocalShop",
  description: "LocalShop - Your local shop online",
};

const RootLayout:FC<LayoutProps> = ({ children }) => (
  <html lang="en">
    <body className="flex flex-col min-h-svh">
      <main className="flex flex-col flex-grow">
        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Footer />
      </main>
    </body>
  </html>
);

export default RootLayout;
