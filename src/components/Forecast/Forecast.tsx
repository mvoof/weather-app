import React from 'react';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { ForecastDay } from '@/types';

import styles from './Forecast.module.scss';

interface ForecastProps {
  forecast: ForecastDay[];
}

export const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
  return (
    <section className={styles.forecastSection}>
      <h2>5-Day Forecast</h2>

      <div className={styles.forecastGrid}>
        {forecast.map((day, index) => (
          <WeatherCard key={index} weather={day} />
        ))}
      </div>
    </section>
  );
};
