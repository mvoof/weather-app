import React from 'react';
import { useTheme } from '@/hooks/useTheme';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDark ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button>
  );
};
