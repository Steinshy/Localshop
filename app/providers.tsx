"use client";

// React
import { FC } from "react";

// NextUIProvider - ThemeProvider
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Utils - subProviders
import { UserProvider, CartProvider } from "./utils/subProviders";

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers:FC<ProvidersProps> = ({ children }) => (
  <NextUIProvider className="flex flex-col flex-grow">
    <NextThemesProvider attribute="class" defaultTheme="light">
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </NextThemesProvider>
  </NextUIProvider>
);

export default Providers;
