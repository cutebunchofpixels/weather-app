import { createSlice } from "@reduxjs/toolkit";
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
    reducers: {},
});

export default placesSlice.reducer;

