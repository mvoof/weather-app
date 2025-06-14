import React from 'react';
import { useTheme } from '@/hooks/useTheme';

import styles from './ThemeToggle.module.scss';

export const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <label className={styles.switchLabel} htmlFor="theme-toggle">
      <input
        type="checkbox"
        id="theme-toggle"
        className={styles.switchInput}
        checked={isDark}
        onChange={toggleTheme}
      />

      <div className={styles.switchSlider}>
        <div className={styles.switchThumb}>
          {isDark ? (
            <span className={styles.themeIcon}>🌙</span>
          ) : (
            <span className={styles.themeIcon}>🌞</span>
          )}
        </div>
      </div>
    </label>
  );
};
