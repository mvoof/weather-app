# [🌤️ Weather App](https://mvoof.github.io/weather-app)

A modern weather application built with React and TypeScript. This app allows users to search for weather information by city, view current conditions, and see a multi-day forecast. It features geolocation support, a clean UI, and responsive design.

## Features

- Search for weather by city name
- View current weather conditions
- 5-day weather forecast
- Geolocation support to get weather for your current location
- Loading indicator while fetching data
- Responsive and modern UI

## Tech Stack

- React
- TypeScript
- SCSS (modular styles)
- Webpack

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd weather-app
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
3. Create .env file and add into it your OpenWeather API key:
   ```bash
   touch .env
   echo OPENWEATHER_API_KEY=YOUR_API_KEY >> .env
   ```

### Running the App

Start the development server:

```bash
npm run start
# or
yarn start
```

The app will be available at `http://localhost:3000` by default.

### Building for Production

```bash
npm run build
# or
yarn build
```

**Note:** The production-ready files will be in the `dist/` directory.

## License

MIT
