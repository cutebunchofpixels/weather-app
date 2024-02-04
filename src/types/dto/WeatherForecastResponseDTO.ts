import { Weather } from "../models/Weather";

export interface WeatherForecastResponseDTO {
    timezone_offset: number;

    current: {
        dt: number;
        temp: number;
        feels_like: number;
        wind_speed: number;
        pressure: number;
        humidity: number;
        weather: Weather[];
    };

    daily: {
        temp: {
            max: number;
        };
    };
}

