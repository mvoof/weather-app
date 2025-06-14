import React from 'react';
import { useState } from 'react';
import { weatherStore } from '@/store/weatherStore';

import styles from './SearchBar.module.scss';

export const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchTerm.trim()) {
      weatherStore.loadWeather('city', searchTerm.trim());
    }

    setSearchTerm('');
  };

  return (
    <form className={styles.searchForm} onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter city name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <button type="submit">🔍</button>
    </form>
  );
};
