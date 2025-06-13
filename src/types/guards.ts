import { WeatherResponse, ForecastResponse, ForecastDay } from './index';

// Проверка текущей погоды
export function isWeatherResponse(data: any): data is WeatherResponse {
	return (
		typeof data === 'object' &&
		'coord' in data &&
		'weather' in data &&
		'main' in data &&
		'name' in data &&
		Array.isArray(data.weather) &&
		typeof data.main.temp === 'number' &&
		typeof data.name === 'string'
	);
}

export function isValidWeatherData(data: any): data is WeatherResponse {
	return isWeatherResponse(data);
}

// Проверка прогноза
export function isForecastResponse(data: any): data is ForecastResponse {
	return (
		typeof data === 'object' &&
		'list' in data &&
		'city' in data &&
		Array.isArray(data.list) &&
		data.list.length > 0 &&
		typeof data.city.name === 'string'
	);
}

export function isValidForecastData(data: any): data is ForecastResponse {
	return isForecastResponse(data);
}

// Проверка дня прогноза
export function isForecastDay(data: any): data is ForecastDay {
	return (
		typeof data === 'object' &&
		'dt' in data &&
		'main' in data &&
		'weather' in data &&
		'wind' in data &&
		'visibility' in data &&
		'pop' in data &&
		'dt_txt' in data
	);
}
