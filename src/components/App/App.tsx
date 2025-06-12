import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import weatherStore from '../../store/weatherStore';
import useGeolocation from '../../hooks/useGeolacation';
import { Header } from '../Header/Header';
import { WeatherCard } from '../WeatherCard/WeatherCard';
import { Forecast } from '../Forecast/Forecast';
import './App.scss';

const App: React.FC = observer(() => {
	const { location } = useGeolocation();
	console.log(location);

	useEffect(() => {
		if (location && !weatherStore.currentWeather) {
			weatherStore.getWeatherByCoords(location.latitude, location.longitude);
		} else {
			weatherStore.getWeatherByCity('Moscow');
		}
	}, [location]);

	return (
		<div className="app">
			<div className="container">
				<Header />

				<main>
					{weatherStore.isLoading ? (
						<div className="loading">
							<div className="spinner"></div>
							<p>Loading weather data...</p>
						</div>
					) : weatherStore.error ? (
						<div className="error">
							<p>{weatherStore.error}</p>
							<button onClick={() => window.location.reload()}>
								Try again
							</button>
						</div>
					) : (
						<>
							<section className="current-weather-section">
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

				<footer>
					<p>Powered by OpenWeatherMap</p>
				</footer>
			</div>
		</div>
	);
});

export default App;
