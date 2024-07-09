'use client';

// React
import { useEffect, useState } from "react";

// NextUITheme
import { useTheme } from "next-themes";

// NextUI
import { Switch } from "@nextui-org/switch";

// Icons
import { MoonIcon, SunIcon } from "@utils/themeSwitcherIcons";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState<boolean>(false),
        { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const setIsSelected = (isSelected: boolean) => {
    setTheme(isSelected ? 'dark' : 'light');
  };

  return (
    <div className='text-black'>
      {mounted ? (
        <Switch
          isSelected={theme === 'dark'}
          onValueChange={setIsSelected}
          size='lg'
          color='danger'
          thumbIcon={theme === 'dark' ? <MoonIcon /> : <SunIcon />}
        />
      ) : (
        <Switch isSelected={false} size='lg' color='danger' thumbIcon={<SunIcon />} />
      )}
    </div>
  )
};

export default ThemeSwitcher;
