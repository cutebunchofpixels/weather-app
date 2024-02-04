import { WeatherMeasurements } from "../types/models/WeatherMeasurement";
import { MeasurementSystem } from "../types/dto/WeatherForecastDTO";

export const measurementSystemUnits = {
    [MeasurementSystem.Metric]: new WeatherMeasurements("Pa", "%", "m/s", "C"),
    [MeasurementSystem.Imperial]: new WeatherMeasurements(
        "Pa",
        "%",
        "mi/h",
        "F"
    ),
};

