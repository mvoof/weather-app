import React from 'react';
import { WeatherCard } from '../WeatherCard/WeatherCard';

import './Forecast.scss';

interface ForecastProps {
	forecast: any[];
}

export const Forecast: React.FC<ForecastProps> = ({ forecast }) => {
	return (
		<section className="forecast-section">
			<h2>5-Day Forecast</h2>

			<div className="forecast-grid">
				{forecast.map((day, index) => (
					<WeatherCard key={index} weather={day} />
				))}
			</div>
		</section>
	);
};
