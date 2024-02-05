import { Box } from "@mui/material";
import LanguageSwitcher from "../../layout/language-switcher/LanguageSwitcher";
import LocationAutocomplete from "../../layout/location-autocomplete/LocationAutocomplete";
import WeatherCard from "../../ui/weather-card/WeatherCard";

export default function Home() {
    const cherkasy = {
        placeId: "ChIJf5dkYIZL0UAR2LXLqSPn3Pg",
        description: "Cherkasy, Cherkasy Oblast, Ukraine",
        lat: 49.44131549999999,
        lng: 32.0643442,
    };

    const place = {
        placeId: "ChIJOwg_06VPwokRYv534QaPC8g",
        description: "New York, NY, USA",
        lat: 40.7127753,
        lng: -74.0059728,
    };

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
                    maxHeight: "500px",
                    maxWidth: "500px",
                    display: "flex",
                }}
            >
                <WeatherCard place={place} />
            </Box>
        </Box>
    );
}

