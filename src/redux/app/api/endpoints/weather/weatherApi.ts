import { WeatherForecastDTO } from "../../../../../types/dto/WeatherForecastDTO";
import { WeatherForecastResponseDTO } from "../../../../../types/dto/WeatherForecastResponseDTO";
import { openWeatherAPISlice } from "../../openWeatherAPISlice";

export const weatherAPI = openWeatherAPISlice.injectEndpoints({
    endpoints(builder) {
        return {
            getWeatherForecast: builder.query<
                WeatherForecastResponseDTO,
                WeatherForecastDTO
            >({
                query({ lat, lon, units, exclude, lang }) {
                    const excludeString = exclude
                        ? `&exclude=${exclude.join(",")}`
                        : "";

                    return {
                        url: `?lat=${lat}&lon=${lon}${excludeString}&units=${units}${
                            lang && `&lang=${lang}`
                        }&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`,
                    };
                },
            }),
        };
    },
});

export const { useGetWeatherForecastQuery } = weatherAPI;

