export const CONFIG = {
  API_KEY: process.env.OPENWEATHER_API_KEY || '',
  BASE_URL: 'https://api.openweathermap.org/data/2.5',
  CACHE_TTL_MS: 10 * 60 * 1000, // 10 minutes
};
