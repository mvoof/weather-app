import { CONFIG } from './config';
import { isValidWeatherData, isValidForecastData } from '@/types/guards';

import { WeatherResponse, ForecastDay } from '@/types';

export interface WeatherDataWithList {
  current: WeatherResponse;
  forecastList: ForecastDay[];
}
export class WeatherService {
  private cache = new Map<
    string,
    { data: WeatherDataWithList; timestamp: number }
  >();
  private readonly cacheTTL = CONFIG.CACHE_TTL_MS;

  constructor(private readonly apiKey: string) {}

  async fetchByCoords(lat: number, lon: number): Promise<WeatherDataWithList> {
    const currentUrl = `${CONFIG.BASE_URL}/weather?lat=${lat}&lon=${lon}`;
    const forecastUrl = `${CONFIG.BASE_URL}/forecast?lat=${lat}&lon=${lon}`;

    const cached = this.cache.get(this.buildCacheKey('coords', { lat, lon }));

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${currentUrl}&appid=${this.apiKey}&units=metric`),
        fetch(`${forecastUrl}&appid=${this.apiKey}&units=metric`),
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      if (!isValidWeatherData(currentData)) {
        throw new Error('Invalid weather data received');
      }

      if (!isValidForecastData(forecastData)) {
        throw new Error('Invalid forecast data received');
      }

      const processedForecast = this.processForecast(forecastData.list);

      const result: WeatherDataWithList = {
        current: currentData,
        forecastList: processedForecast,
      };

      this.cache.set(this.buildCacheKey('coords', { lat, lon }), {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async fetchByCity(city: string): Promise<WeatherDataWithList> {
    const currentUrl = `${CONFIG.BASE_URL}/weather?q=${city}`;
    const forecastUrl = `${CONFIG.BASE_URL}/forecast?q=${city}`;

    const cached = this.cache.get(this.buildCacheKey('city', city));

    if (cached && Date.now() - cached.timestamp < this.cacheTTL) {
      return cached.data;
    }

    try {
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${currentUrl}&appid=${this.apiKey}&units=metric`),
        fetch(`${forecastUrl}&appid=${this.apiKey}&units=metric`),
      ]);

      if (!currentResponse.ok || !forecastResponse.ok) {
        throw new Error('Failed to fetch weather data');
      }

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      if (!isValidWeatherData(currentData)) {
        throw new Error('Invalid weather data received');
      }

      if (!isValidForecastData(forecastData)) {
        throw new Error('Invalid forecast data received');
      }

      const processedForecast = this.processForecast(forecastData.list);

      const result: WeatherDataWithList = {
        current: currentData,
        forecastList: processedForecast,
      };

      this.cache.set(this.buildCacheKey('city', city), {
        data: result,
        timestamp: Date.now(),
      });

      return result;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  private buildCacheKey(
    type: 'city' | 'coords',
    value: string | number | { lat: number; lon: number }
  ): string {
    if (type === 'city') {
      return `city:${value}`;
    }
    const { lat, lon } = value as { lat: number; lon: number };
    return `coords:${lat},${lon}`;
  }

  private processForecast(list: ForecastDay[]) {
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
