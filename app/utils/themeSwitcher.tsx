// app/components/ThemeSwitcher.tsx
"use client";

// React
import { useEffect, useState } from "react";

// NextUiTheme
import { useTheme } from "next-themes";

// NextUISwitch
import { Switch } from "@nextui-org/switch";

// React Icons
import { MoonIcon, SunIcon } from "./themeSwitcherIcons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const setIsSelected = (isSelected: boolean) => {
    setTheme(isSelected ? "light" : "dark");
  };

  const renderIcon = ({ isSelected }: { isSelected: boolean; }) => (
    isSelected ? <SunIcon /> : <MoonIcon />
  );

  return mounted ? (
    <Switch
      isSelected={theme === "light"}
      onValueChange={setIsSelected}
      size="lg"
      color="danger"
      thumbIcon={renderIcon}
    />
  ) : (
    <Switch
      isSelected={true}
      size="lg"
      color="danger"
      thumbIcon={<SunIcon />}
    />
  );
};

export default ThemeSwitcher;