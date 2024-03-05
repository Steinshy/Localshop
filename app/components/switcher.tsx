// app/components/ThemeSwitcher.tsx
"use client";

// React
import { useEffect, useState } from "react";

// Next
import { useTheme } from "next-themes";

// NextUI
import { Switch } from "@nextui-org/switch";

// React Icons
import { MoonIcon, SunIcon } from "./icons";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const setIsSelected = (isSelected: boolean) => {
    setTheme(isSelected ? "light" : "dark");
  };

  return (
    <Switch
      defaultSelected
      isSelected={theme === "light"}
      onValueChange={setIsSelected}
      size="lg"
      color="danger"
      thumbIcon={({ isSelected, className }) =>
        isSelected ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
    />
  );
};
