import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Place } from "../../../types/models/Place";

interface PlacesState {
    places: Place[];
}

const initialState: PlacesState = {
    places: [],
};

const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        addPlace(state, action: PayloadAction<Place>) {
            state.places.unshift(action.payload);
        },

        removePlace(state, action: PayloadAction<string>) {
            const placeId = action.payload;
            const removePlaceIndex = state.places.findIndex(
                (place) => place.placeId === placeId
            );

            state.places.splice(removePlaceIndex, 1);
        },
    },
});

export const { addPlace, removePlace } = placesSlice.actions;
export default placesSlice.reducer;

