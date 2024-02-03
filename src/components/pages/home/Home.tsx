import { Box } from "@mui/material";
import LanguageSwitcher from "../../layout/language-switcher/LanguageSwitcher";
import LocationAutocomplete from "../../layout/location-autocomplete/LocationAutocomplete";

export default function Home() {
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
        </Box>
    );
}

