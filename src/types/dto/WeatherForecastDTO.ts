export enum MeasurementSystem {
    Metric = "metric",
    Imperial = "imperial",
}

export enum RequestPart {
    Current = "current",
    Minutely = "minutely",
    Hourly = "hourly",
    Daily = "daily",
    Alerts = "alerts",
}

export interface WeatherForecastDTO {
    lat: number;
    lon: number;
    lang?: string;
    units?: MeasurementSystem;
    exclude?: RequestPart[];
}

