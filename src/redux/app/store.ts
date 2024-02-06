import { combineReducers, configureStore } from "@reduxjs/toolkit";
import placesReducer from "../features/places/placesSlice";
import { openWeatherAPISlice } from "./api/openWeatherAPISlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({
    [openWeatherAPISlice.reducerPath]: openWeatherAPISlice.reducer,
    places: placesReducer,
});

const persistConfig = {
    key: "root",
    storage,
    blacklist: [openWeatherAPISlice.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER,
                ],
            },
        }).concat(openWeatherAPISlice.middleware),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

