import { Box } from "@mui/material";
import LanguageSwitcher from "../../layout/language-switcher/LanguageSwitcher";
import LocationAutocomplete from "../../layout/location-autocomplete/LocationAutocomplete";
import WeatherCardList from "../../layout/weather-card-list/WeatherCardList";
import { useAppSelector } from "../../../redux/app/hooks";

export default function Home() {
    const places = useAppSelector((state) => state.places.places);

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

