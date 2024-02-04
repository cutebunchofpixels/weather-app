import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const openWeatherAPISlice = createApi({
    reducerPath: "openWeatherAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.REACT_APP_OPEN_WEATHER_API_BASE_URL,
    }),
    endpoints: () => ({}),
});

