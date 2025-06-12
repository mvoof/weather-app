import { makeAutoObservable } from 'mobx';

export class WeatherStore {
	currentWeather: any = null;
	forecast: any[] = [];
	isLoading: boolean = false;
	error: string | null = null;
	city: string = '';

	private apiKey: string;

	constructor() {
		makeAutoObservable(this);
		this.apiKey = process.env.OPENWEATHER_API_KEY || '';
	}

	async getWeatherByCoords(lat: number, lon: number) {
		this.isLoading = true;
		this.error = null;

		try {
			const currentResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
			);

			if (!currentResponse.ok) {
				throw new Error('Failed to fetch current weather');
			}

			const currentData = await currentResponse.json();
			this.currentWeather = currentData;
			this.city = currentData.name;

			const forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
			);

			if (!forecastResponse.ok) {
				throw new Error('Failed to fetch forecast');
			}

			const forecastData = await forecastResponse.json();
			this.forecast = this.processForecast(forecastData.list);
		} catch (err: any) {
			this.error = err.message;
		} finally {
			this.isLoading = false;
		}
	}

	async getWeatherByCity(city: string) {
		this.isLoading = true;
		this.error = null;

		try {
			const currentResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`
			);

			if (!currentResponse.ok) {
				throw new Error('Failed to fetch current weather');
			}

			const currentData = await currentResponse.json();
			this.currentWeather = currentData;
			this.city = currentData.name;

			const forecastResponse = await fetch(
				`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.apiKey}&units=metric`
			);

			if (!forecastResponse.ok) {
				throw new Error('Failed to fetch forecast');
			}

			const forecastData = await forecastResponse.json();
			this.forecast = this.processForecast(forecastData.list);
		} catch (err: any) {
			this.error = err.message;
		} finally {
			this.isLoading = false;
		}
	}

	private processForecast(list: any[]) {
		// Group forecasts by day and take the first forecast of each day
		const daysMap = new Map();

		for (const item of list) {
			const date = new Date(item.dt * 1000);
			const day = date.getDate();

			if (!daysMap.has(day)) {
				daysMap.set(day, item);
			}

			if (daysMap.size >= 5) break;
		}

		return Array.from(daysMap.values());
	}
}

const weatherStore = new WeatherStore();

export default weatherStore;
