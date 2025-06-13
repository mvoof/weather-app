import { makeAutoObservable } from 'mobx';
import { CONFIG } from '../services/config';
import { WeatherService } from '../services/weatherService';
import {
	WeatherResponse,
	ForecastDay,
	WeatherRequestType,
	WeatherState,
} from '@/types';

class WeatherStore {
	private service: WeatherService;

	state: WeatherState = {
		currentWeather: null,
		forecastList: [],
		isLoading: false,
		error: null,
		city: '',
	};

	autoRefreshInterval: number | null = null;

	constructor() {
		makeAutoObservable(this);
		this.service = new WeatherService(CONFIG.API_KEY);
	}

	setState(update: Partial<WeatherState>) {
		this.state = { ...this.state, ...update };
	}

	get isLoading(): boolean {
		return this.state.isLoading;
	}

	get error(): string | null {
		return this.state.error;
	}

	get currentWeather(): WeatherResponse | null {
		return this.state.currentWeather;
	}

	get forecast(): ForecastDay[] {
		return this.state.forecastList ?? [];
	}

	get city(): string {
		return this.state.city;
	}

	async loadWeather(
		type: WeatherRequestType,
		payload: string | { lat: number; lon: number }
	) {
		this.setState({ isLoading: true, error: null });

		let result: {
			current: WeatherResponse;
			forecastList: ForecastDay[];
		} | null = null;

		try {
			if (type === 'city') {
				result = await this.service.fetchByCity(payload as string);
				this.setState({ city: result?.current.name || '' });
			} else if (type === 'coords') {
				const { lat, lon } = payload as { lat: number; lon: number };
				result = await this.service.fetchByCoords(lat, lon);
				this.setState({ city: result?.current.name || '' });
			}

			if (result) {
				this.setState({
					currentWeather: result.current,
					forecastList: result.forecastList, // сохраняем только list
				});
			}
		} catch (err: any) {
			this.setState({ error: err.message });
		} finally {
			this.setState({ isLoading: false });
		}
	}

	startAutoRefresh(intervalMs = CONFIG.CACHE_TTL_MS) {
		if (this.autoRefreshInterval) {
			window.clearInterval(this.autoRefreshInterval);
		}

		this.autoRefreshInterval = window.setInterval(() => {
			if (this.state.city) {
				this.loadWeather('city', this.state.city);
			} else if (this.state.currentWeather?.coord) {
				const { lat, lon } = this.state.currentWeather.coord;
				this.loadWeather('coords', { lat, lon });
			}
		}, intervalMs);
	}

	stopAutoRefresh() {
		if (this.autoRefreshInterval) {
			window.clearInterval(this.autoRefreshInterval);
			this.autoRefreshInterval = null;
		}
	}
}

export const weatherStore = new WeatherStore();
