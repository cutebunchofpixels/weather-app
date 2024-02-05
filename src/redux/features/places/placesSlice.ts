import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Place } from "../../../types/models/Place";

interface PlacesState {
    value: Place[];
}

const initialState: PlacesState = {
    value: [],
};

const placesSlice = createSlice({
    name: "places",
    initialState,
    reducers: {
        addPlace(state, action: PayloadAction<Place>) {
            state.value.unshift(action.payload);
        },

        removePlace(state, action: PayloadAction<string>) {
            const placeId = action.payload;
            const removePlaceIndex = state.value.findIndex(
                (place) => place.placeId === placeId
            );

            state.value.splice(removePlaceIndex, 1);
        },
    },
});

export const { addPlace, removePlace } = placesSlice.actions;
export default placesSlice.reducer;

