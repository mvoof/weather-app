import React from 'react';
import { WeatherDetail } from '../WeatherDetail/WeatherDetail';
import { weatherStore } from '@/store/weatherStore';
import { ForecastDay, WeatherResponse } from '@/types';

import styles from './WeatherCard.module.scss';

interface WeatherCardProps {
  weather: WeatherResponse | ForecastDay;
  isCurrent?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  isCurrent,
}) => {
  const getIcon = (weatherId: number) => {
    if (weatherId < 300) return '🌩️';
    if (weatherId < 400) return '🌧️';
    if (weatherId < 600) return '🌧️';
    if (weatherId < 700) return '❄️';
    if (weatherId < 800) return '🌫️';
    if (weatherId === 800) return '☀️';
    if (weatherId < 805) return '☁️';
    return '🌈';
  };

  const detailVariant = isCurrent ? 'default' : 'forecast';

  return (
    <div className={isCurrent ? styles.currentWeather : styles.forecastWeather}>
      {isCurrent && (
        <div className={styles.currentLocation}>
          <h2>{weatherStore.city}</h2>

          <p>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      )}

      <div className={styles.weatherIcon}>{getIcon(weather.weather[0].id)}</div>

      <div className={styles.temperature}>
        <span className={styles.tempValue}>
          {Math.round(weather.main.temp)}
        </span>

        <span className={styles.tempUnit}>°C</span>
      </div>

      <div className={styles.weatherDescription}>
        <h3>{weather.weather[0].description}</h3>
      </div>

      {!isCurrent && (
        <div className={styles.forecastDate}>
          {new Date(weather.dt * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            day: 'numeric',
            month: 'short',
          })}
        </div>
      )}

      <div className={styles.weatherDetails}>
        <WeatherDetail
          icon="💧"
          label="Humidity"
          value={`${weather.main.humidity}%`}
          variant={detailVariant}
        />

        <WeatherDetail
          icon="🌬️"
          label="Wind"
          value={`${Math.round(weather.wind.speed)} m/s`}
          variant={detailVariant}
        />

        <WeatherDetail
          icon="🔽"
          label="Pressure"
          value={`${weather.main.pressure} hPa`}
          variant={detailVariant}
        />
      </div>
    </div>
  );
};
