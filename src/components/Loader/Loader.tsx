import React from 'react';

import styles from './Loader.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.spinner}></div>

      <p className={styles.loadingText}>Loading weather data...</p>
    </div>
  );
};
