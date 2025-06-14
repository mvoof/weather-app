import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

import styles from './Header.module.scss';

export const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>🌤️ WeatherApp</h1>
      <SearchBar />
      <ThemeToggle />
    </header>
  );
};
