import React from 'react';

import styles from './WeatherDetail.module.scss';

interface WeatherDetailProps {
  icon: string;
  label: string;
  value: number | string;
  variant?: 'default' | 'forecast';
}

export const WeatherDetail: React.FC<WeatherDetailProps> = ({
  icon,
  label,
  value,
  variant = 'default',
}) => {
  return (
    <div
      className={`${styles.weatherDetail} ${variant === 'forecast' ? styles.weatherForecast : styles.weatherMain}`}
    >
      <div className={styles.weatherDetailIcon}>{icon}</div>

      <div className={styles.weatherInfo}>
        <span className={styles.label}>{label}</span>
        <span className={styles.value}>{value}</span>
      </div>
    </div>
  );
};
