import { configureStore } from "@reduxjs/toolkit";
import placesReducer from "../features/places/placesSlice";
import { openWeatherAPISlice } from "./api/openWeatherAPISlice";

export const store = configureStore({
    reducer: {
        [openWeatherAPISlice.reducerPath]: openWeatherAPISlice.reducer,
        places: placesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(openWeatherAPISlice.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

