"use client";

// NextUIProvider - ThemeProvider
import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

// Utils - CartProvider - sub provider goes here
import { CartProvider } from "./utils/cartProvider";
import { UserProvider } from "./utils/userProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="flex flex-col flex-grow">
      <NextThemesProvider attribute="class" defaultTheme="light">
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </NextThemesProvider>
    </NextUIProvider>
  );
}
