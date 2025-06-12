import React from 'react';
import './Header.scss';
import { SearchBar } from '../SearchBar/SearchBar';

export const Header: React.FC = () => {
	return (
		<header>
			<h1>🌤️ WeatherApp</h1>
			<SearchBar />
		</header>
	);
};
