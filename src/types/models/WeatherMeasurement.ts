export class WeatherMeasurements {
    constructor(
        pressure: string,
        humidity: string,
        windSpeed: string,
        temperature: string
    ) {
        this.pressure = pressure;
        this.humidity = humidity;
        this.speed = windSpeed;
        this.temperature = temperature;
    }

    pressure: string;
    humidity: string;
    speed: string;
    temperature: string;
}

