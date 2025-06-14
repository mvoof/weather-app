import React from 'react';
import { useTheme } from '@/hooks/useTheme';

import './ThemeToggle.scss';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <label className="switch-label" htmlFor="theme-toggle">
      <input
        type="checkbox"
        id="theme-toggle"
        className="switch-input"
        checked={isDark}
        onChange={toggleTheme}
      />
      <div className="switch-slider">
        <div className="switch-thumb">{isDark ? '🌙' : '🌞'}</div>
      </div>
    </label>
  );
};
