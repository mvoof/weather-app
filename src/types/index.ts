// === Типы погоды ===
export interface WeatherResponse {
	coord: { lon: number; lat: number };
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		},
	];
	base: string;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		humidity: number;
		sea_level?: number;
		grnd_level?: number;
	};
	visibility: number;
	wind: {
		speed: number;
		deg: number;
	};
	clouds: {
		all: number;
	};
	dt: number;
	sys: {
		type: number;
		id: number;
		country: string;
		sunrise: number;
		sunset: number;
	};
	timezone: number;
	id: number;
	name: string;
	cod: number;
}

export interface ForecastDay {
	dt: number;
	main: {
		temp: number;
		feels_like: number;
		temp_min: number;
		temp_max: number;
		pressure: number;
		sea_level: number;
		grnd_level: number;
		humidity: number;
		temp_kf: number;
	};
	weather: [
		{
			id: number;
			main: string;
			description: string;
			icon: string;
		},
	];
	clouds: {
		all: number;
	};
	wind: {
		speed: number;
		deg: number;
		gust?: number;
	};
	visibility: number;
	pop: number;
	rain?: {
		'3h': number;
	};
	snow?: {
		'3h': number;
	};
	dt_txt: string;
}

export interface ForecastResponse {
	cod: string;
	message: number;
	cnt: number;
	list: ForecastDay[];
	city: {
		id: number;
		name: string;
		coord: {
			lat: number;
			lon: number;
		};
		country: string;
		population: number;
		tz: number;
		sunset: number;
		sunrise: number;
	};
}

export type WeatherData = {
	current: WeatherResponse;
	forecastList: ForecastDay[];
};

export interface WeatherState {
	currentWeather: WeatherResponse | null;
	forecastList: ForecastDay[] | null;
	isLoading: boolean;
	error: string | null;
	city: string;
}

// Можно добавить и другие общие типы
export type WeatherRequestType = 'coords' | 'city';
