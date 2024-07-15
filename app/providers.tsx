'use client';

// React
import { FC } from "react";

// NextThemes
import { ThemeProvider as NextThemesProvider } from "next-themes";

// NextUIProvider
import { NextUIProvider } from "@nextui-org/react";

// Providers
import { CartProvider } from '@subProviders/cartProvider';
import { UserProvider } from '@subProviders/userProvider';

// Interfaces
import { ProviderProps } from "@interfaces/subProviders";

const Providers: FC<ProviderProps> = ({ children, initialUser, initialCart }) => (
  <NextUIProvider className="flex flex-col flex-grow">
    <NextThemesProvider attribute="class" defaultTheme="light">
      <UserProvider initialUser={initialUser}>
        <CartProvider initialCart={initialCart}>{children}</CartProvider>
      </UserProvider>
    </NextThemesProvider>
  </NextUIProvider>
);

export default Providers;
