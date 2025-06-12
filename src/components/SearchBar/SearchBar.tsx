import React from 'react';
import { useState } from 'react';
import weatherStore from '@/store/weatherStore';
import './SearchBar.scss';

export const SearchBar: React.FC = () => {
	const [searchTerm, setSearchTerm] = useState('');

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();

		if (searchTerm.trim()) {
			weatherStore.getWeatherByCity(searchTerm.trim());
		}

		setSearchTerm('');
	};

	return (
		<form className="search-form" onSubmit={handleSearch}>
			<input
				type="text"
				placeholder="Enter city name..."
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
			/>

			<button type="submit">🔍</button>
		</form>
	);
};
