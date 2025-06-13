import React from 'react';

import './WeatherDetail.scss';

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
			className={`weather-detail ${variant === 'forecast' ? 'weather-detail--forecast' : 'weather-detail--main'}`}
		>
			<div className="weather-detail__icon">{icon}</div>

			<div className="weather-detail__info">
				<span className="label">{label}</span>
				<span className="value">{value}</span>
			</div>
		</div>
	);
};
