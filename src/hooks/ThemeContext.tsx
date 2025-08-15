import { useEffect, useState } from 'react';

const THEME_STORAGE = 'zenflow@theme';

export function useTheme() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem(THEME_STORAGE);
    if (storedTheme) {
      setIsDark(storedTheme === 'dark');
      document.documentElement.classList.toggle('dark', storedTheme === 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark((prev) => {
      document.documentElement.classList.toggle('dark', !prev);
      localStorage.setItem('theme', !prev ? 'dark' : 'light');
      return !prev;
    });
  };

  return { isDark, toggleDarkMode };
}
