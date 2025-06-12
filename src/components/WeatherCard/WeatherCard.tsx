import React from 'react';
import weatherStore from '@/store/weatherStore';
import './WeatherCard.scss';

interface WeatherCardProps {
	weather: any;
	isCurrent?: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({
	weather,
	isCurrent = false,
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

	return (
		<div
			className={`weather-card ${isCurrent ? 'current-weather' : 'forecast-weather'}`}
		>
			{isCurrent && (
				<div className="current-location">
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

			<div className="weather-icon">{getIcon(weather.weather[0].id)}</div>

			<div className="temperature">
				<span className="temp-value">{Math.round(weather.main.temp)}</span>
				<span className="temp-unit">°C</span>
			</div>

			<div className="weather-description">
				<h3>{weather.weather[0].description}</h3>
			</div>

			{!isCurrent && (
				<div className="forecast-date">
					{new Date(weather.dt * 1000).toLocaleDateString('en-US', {
						weekday: 'short',
						day: 'numeric',
						month: 'short',
					})}
				</div>
			)}

			<div className="weather-details">
				<div className="detail-item">
					<span>💧 Humidity</span>
					<span>{weather.main.humidity}%</span>
				</div>

				<div className="detail-item">
					<span>🌬️ Wind</span>
					<span>{Math.round(weather.wind.speed)} m/s</span>
				</div>

				<div className="detail-item">
					<span>🔽 Pressure</span>
					<span>{weather.main.pressure} hPa</span>
				</div>
			</div>
		</div>
	);
};
