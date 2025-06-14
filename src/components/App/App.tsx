import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import useGeolocation from '../../hooks/useGeolacation';
import { weatherStore } from '../../store/weatherStore';
import { Header } from '../Header/Header';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { Forecast } from '../Forecast/Forecast';
import { Loader } from '../Loader/Loader';
import { Error } from '../Error/Error';

import styles from './App.module.scss';

const App: React.FC = observer(() => {
  const { location } = useGeolocation();

  useEffect(() => {
    if (location && !weatherStore.state.currentWeather) {
      weatherStore.loadWeather('coords', {
        lat: location.latitude,
        lon: location.longitude,
      });
    }
  }, [location]);

  useEffect(() => {
    weatherStore.startAutoRefresh(10 * 60 * 1000);

    return () => {
      weatherStore.stopAutoRefresh();
    };
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <Header />

        <main>
          {weatherStore.isLoading ? (
            <Loader />
          ) : weatherStore.error ? (
            <Error error={weatherStore.error} />
          ) : (
            <>
              <section className={styles.currentWeather}>
                {weatherStore.currentWeather && (
                  <WeatherCard
                    weather={weatherStore.currentWeather}
                    isCurrent
                  />
                )}
              </section>

              <Forecast forecast={weatherStore.forecast} />
            </>
          )}
        </main>

        <footer className={styles.footer}>
          <p>Powered by OpenWeatherMap</p>
        </footer>
      </div>
    </div>
  );
});

export default App;
