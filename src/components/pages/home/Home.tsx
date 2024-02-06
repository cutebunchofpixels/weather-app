import { Box } from "@mui/material";
import LanguageSwitcher from "../../layout/language-switcher/LanguageSwitcher";
import LocationAutocomplete from "../../layout/location-autocomplete/LocationAutocomplete";
import WeatherCardList from "../../layout/weather-card-list/WeatherCardList";
import { useAppDispatch, useAppSelector } from "../../../redux/app/hooks";
import { Place } from "../../../types/models/Place";
import { useCallback, useEffect, useRef } from "react";
import { addPlace } from "../../../redux/features/places/placesSlice";
import { LOCAL_STORAGE_LOCATION_INIT_KEY } from "../../../utils/constants";

async function geocodeLatLng(
    geocoder: google.maps.Geocoder,
    lat: number,
    lng: number
) {
    return geocoder.geocode({
        location: { lat, lng },
    });
}

export default function Home() {
    const isInitizalizedWithUserLocation = useRef<Boolean>();
    const places = useAppSelector((state) => state.places.value);
    const dispatch = useAppDispatch();

    isInitizalizedWithUserLocation.current =
        localStorage.getItem(LOCAL_STORAGE_LOCATION_INIT_KEY) === "true";

    const geolocationSuccess = useCallback(
        async function geolocationSuccess(position: GeolocationPosition) {
            const { latitude: lat, longitude: lng } = position.coords;
            const geocoder = new google.maps.Geocoder();
            const geocodeResponse = await geocodeLatLng(geocoder, lat, lng);

            const placeData = geocodeResponse.results.find((result) =>
                result.types.includes("locality")
            );

            if (!placeData) {
                console.log("No results");
                return;
            }

            const newPlace: Place = {
                placeId: placeData.place_id,
                lat: lat,
                lng: lng,
            };

            dispatch(addPlace(newPlace));
        },
        [dispatch]
    );

    useEffect(() => {
        if (isInitizalizedWithUserLocation.current || !navigator.geolocation) {
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => geolocationSuccess(position),
            () => {}
        );

        isInitizalizedWithUserLocation.current = true;
        localStorage.setItem(LOCAL_STORAGE_LOCATION_INIT_KEY, "true");
    }, [geolocationSuccess]);

    return (
        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: "1" }}>
            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <LanguageSwitcher />
            </Box>
            <Box
                sx={{ display: "flex", mt: "4.5rem", justifyContent: "center" }}
            >
                <Box sx={{ maxWidth: "691px", width: "100%" }}>
                    <LocationAutocomplete />
                </Box>
            </Box>
            <Box
                sx={{
                    mt: "122px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, 350px)",
                    gap: "30px",
                    justifyContent: "center",
                }}
            >
                <WeatherCardList places={places} />
            </Box>
        </Box>
    );
}

