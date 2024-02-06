import { Place } from "../../../types/models/Place";
import { Typography } from "@mui/material";
import WeatherCard from "../../ui/weather-card/WeatherCard";
import { useTranslation } from "react-i18next";

export default function WeatherCardList({ places }: { places: Place[] }) {
    const { t } = useTranslation();

    if (places.length === 0) {
        return (
            <Typography
                textAlign="center"
                fontSize="20px"
                sx={{ gridColumn: "1 / -1" }}
            >
                {t("weatherCardList.noPlaces")}
            </Typography>
        );
    }

    return (
        <>
            {places.map((place) => (
                <WeatherCard place={place} key={place.placeId} />
            ))}
        </>
    );
}

