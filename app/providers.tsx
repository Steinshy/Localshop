'use client'

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from "next-themes";

export function Providers({children}: { children: React.ReactNode }) {
  return (
    <NextUIProvider className="flex flex-col flex-grow">
      <NextThemesProvider attribute="class" defaultTheme="dark">
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  )
}