'use client';

// React
import { FC } from "react";

// NextThemes
import { ThemeProvider as NextThemesProvider } from "next-themes";

// NextUIProvider - ThemeProvider
import { NextUIProvider } from "@nextui-org/react";

// Providers
import { UserProvider, CartProvider } from "@utils/subProviders";

// Interface
import { LayoutProps } from "@interfaces/general";

const Providers:FC<LayoutProps> = ({ children }) => (
  <NextUIProvider className="flex flex-col flex-grow">
    <NextThemesProvider attribute="class" defaultTheme="light">
      <UserProvider>
        <CartProvider>{children}</CartProvider>
      </UserProvider>
    </NextThemesProvider>
  </NextUIProvider>
);

export default Providers;
