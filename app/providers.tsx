'use client'

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { CartProvider } from './utils/cartProvider';

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="flex flex-col flex-grow">
      <NextThemesProvider attribute="class" defaultTheme="dark">
        <CartProvider>
          {children}
        </CartProvider>
      </NextThemesProvider>
    </NextUIProvider>
  )
}