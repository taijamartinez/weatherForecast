import dotenv from 'dotenv';
dotenv.config();


// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  city: string;
  date: string;
  icon: string;
  iconDescription: string;
  tempF: number;
  humidity: number;
  windSpeed: number;

  constructor(data: any) {
      this.city = data.name;
      this.date = new Date().toLocaleDateString();
      this.icon = data.weather[0].icon;
      this.iconDescription = data.weather[0].description;
      this.tempF = data.main.temp;
      this.humidity = data.main.humidity;
      this.windSpeed = data.wind.speed;
  }
}

// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  API_KEY: string;
  API_BASE_URL: string;
  cityName: string;
constructor() {
    this.API_KEY = process.env.API_KEY || '';
    this.API_BASE_URL = 'https://api.openweathermap.org';
    this.cityName = '';
}
  private async fetchLocationData(query: string): Promise<Coordinates> {
    const locationUrl = `${this.API_BASE_URL}/geo/1.0/direct?q=${query}&limit=1&appid=${this.API_KEY}`;
    const response = await fetch(locationUrl);
console.log(locationUrl, response);
    if (!response.ok) {
        throw new Error('Failed to fetch location data');
    }

    const locationData = await response.json();
    return {
        lat: locationData[0].lat,
        lon: locationData[0].lon
    };
  }
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}
  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherUrl = `${this.API_BASE_URL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.API_KEY}&units=imperial`;
    const response = await fetch(weatherUrl);

    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const weatherData = await response.json();
    const filterTime = weatherData.list[1].dt_txt.split(' ')[1];
    const filterData = weatherData.list.filter((data: any)=> data.dt_txt.split(' ')[1] === filterTime);
    filterData.unshift(weatherData.list[0]);

    console.log(filterData.length);
    console.log(filterData);
    return filterData.map((data: any) => new Weather({...data, name: this.cityName}));  
  }
  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  // TODO: Complete buildForecastArray method
  //private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<Weather> {
    this.cityName = city;
    const coordinates = await this.fetchLocationData(city);
    const currentWeather = await this.fetchWeatherData(coordinates);
    return currentWeather;
  }
}

export default new WeatherService();
