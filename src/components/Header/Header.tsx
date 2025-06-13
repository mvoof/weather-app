import React from 'react';
import { SearchBar } from '../SearchBar/SearchBar';

import './Header.scss';

export const Header: React.FC = () => {
	return (
		<header>
			<h1>🌤️ WeatherApp</h1>
			<SearchBar />
		</header>
	);
};
