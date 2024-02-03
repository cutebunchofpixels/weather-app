import { TemperatureUnit } from "./TemperatureUnit";

export interface Place {
    placeId: string;
    description: string;
    lat: number;
    lng: number;
    prefferedTemperatureUnit: TemperatureUnit;
}

