import React from 'react';

import './Loader.scss'

export const Loader: React.FC = () => {
	return (
		<div className="loading">
			<div className="spinner"></div>
			<p>Loading weather data...</p>
		</div>
	);
};
