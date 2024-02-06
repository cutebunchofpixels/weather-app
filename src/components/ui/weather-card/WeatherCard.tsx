import CloseIcon from "@mui/icons-material/Close";
import {
    Box,
    ButtonBase,
    CircularProgress,
    IconButton,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GeocodeResult } from "use-places-autocomplete";
import { useAppDispatch } from "../../../redux/app/hooks";
import { removePlace } from "../../../redux/features/places/placesSlice";
import {
    MeasurementSystem,
    RequestPart,
} from "../../../types/dto/WeatherForecastDTO";
import { Place } from "../../../types/models/Place";
import { capitalize } from "../../../utils/capitalize";
import { dayjs } from "../../../utils/dayjs";
import { formatSigned } from "../../../utils/format-signed";
import { getCachedGeocode } from "../../../utils/getCachedGeocode";
import { measurementSystemUnits } from "../../../utils/measurement-system-units";
import DailyForecastChart from "./DailyForecarsChart";
import WeatherMeasurementBagde from "./WeatherMeasurementBadge";
import { useGetWeatherForecastQuery } from "../../../redux/app/api/endpoints/weather/weatherApi";

const Container = styled(Box, {
    shouldForwardProp: (propName) => propName !== "isTempFreezing",
})<{ isTempFreezing: boolean }>(({ theme, isTempFreezing }) => ({
    backgroundColor: isTempFreezing
        ? theme.palette.blue.light
        : theme.palette.orange.light,
    maxWidth: "350px",
    width: "100%",
    boxShadow: theme.shadows[1],
    borderRadius: "5px",
    padding: "10px 15px",
    display: "flex",
    flexDirection: "column",
}));

const UnitsToggleButton = styled(ButtonBase, {
    shouldForwardProp: (propName) => propName !== "isActive",
})<{ isActive: Boolean }>(({ theme, isActive }) => ({
    fontSize: "22px",
    color: isActive ? "#000" : theme.palette.gray.main,
}));

function getPreferredUnits(placeId: string) {
    const preferredUnitsJSON = localStorage.getItem("preferredUnits");
    if (!preferredUnitsJSON) {
        return MeasurementSystem.Metric;
    }

    return JSON.parse(preferredUnitsJSON)[placeId] || MeasurementSystem.Metric;
}

function formatCardTitle(geocodeResult: GeocodeResult | undefined) {
    if (!geocodeResult) {
        return "Loading";
    }

    const cityName = geocodeResult.address_components.find((component) =>
        component.types.includes("locality")
    );
    const countryName = geocodeResult.address_components.find((component) =>
        component.types.includes("country")
    );

    return [cityName?.long_name, countryName?.short_name]
        .filter((x) => Boolean(x))
        .join(", ");
}

export default function WeatherCard({ place }: { place: Place }) {
    const [geocodeResult, setGeocodeResults] = useState<
        GeocodeResult | undefined
    >(undefined);
    const { t, i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const [preferredUnits, setPreferredUnits] = useState<MeasurementSystem>(
        () => getPreferredUnits(place.placeId)
    );

    useEffect(() => {
        getCachedGeocode({
            placeId: place.placeId,
            language: i18n.resolvedLanguage,
        }).then((result) => setGeocodeResults(result));
    }, [i18n.resolvedLanguage, place.placeId]);

    console.log(geocodeResult);

    const { data: weatherForecast, isFetching: isCurrentForecastFetching } =
        useGetWeatherForecastQuery({
            lat: place.lat,
            lon: place.lng,
            exclude: [RequestPart.Hourly],
            units: preferredUnits,
            lang: i18n.resolvedLanguage,
        });

    if (isCurrentForecastFetching || !weatherForecast) {
        return (
            <Container isTempFreezing={false}>
                <Box sx={{ m: "auto", py: "100px" }}>
                    <CircularProgress
                        size="30px"
                        sx={{ color: "orange.main" }}
                    />
                </Box>
            </Container>
        );
    }

    const isTempFreezing =
        (preferredUnits === MeasurementSystem.Metric &&
            weatherForecast.current.temp <= 0) ||
        (preferredUnits === MeasurementSystem.Imperial &&
            weatherForecast.current.temp <= 32);

    const currentDate = dayjs
        .unix(weatherForecast.current.dt)
        .utc()
        .tz(weatherForecast.timezone);

    function handlePreferredUnitsToggle(newValue: MeasurementSystem) {
        const preferredUnitsJSON = localStorage.getItem("preferredUnits");
        let preferredUnits = {};

        if (preferredUnitsJSON) {
            preferredUnits = JSON.parse(preferredUnitsJSON);
        }

        localStorage.setItem(
            "preferredUnits",
            JSON.stringify({ ...preferredUnits, [place.placeId]: newValue })
        );

        setPreferredUnits(newValue);
    }

    return (
        <Container isTempFreezing={isTempFreezing}>
            <IconButton
                onClick={() => dispatch(removePlace(place.placeId))}
                sx={{
                    padding: 0,
                    alignSelf: "end",
                    marginTop: "-9px",
                    marginRight: "-10px",
                }}
            >
                <CloseIcon
                    sx={{
                        fontSize: "13px",
                        color: "gray.main",
                    }}
                />
            </IconButton>
            <Box sx={{ display: "grid", gridTemplateColumns: "1fr auto" }}>
                <Box>
                    <Typography>{formatCardTitle(geocodeResult)}</Typography>
                    <Typography fontSize="18px" fontWeight="300">
                        {currentDate.format("ddd, DD MMMM, HH:mm")}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "end",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                        }}
                    >
                        <Box
                            component="img"
                            alt="weather icon"
                            sx={{
                                width: "50px",
                                height: "50px",
                                marginTop: "-15px",
                            }}
                            src={`${process.env.REACT_APP_OPEN_WEATHER_API_IMG_URL}/${weatherForecast.current.weather[0].icon}@2x.png`}
                        />
                        <Typography
                            fontSize="13px"
                            color="gray.main"
                            maxWidth="65px"
                            paddingRight="10px"
                            lineHeight="1"
                        >
                            {capitalize(
                                weatherForecast.current.weather[0].description
                            )}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: "16px", height: "65px" }}>
                <DailyForecastChart
                    values={weatherForecast.daily.map((value) =>
                        Math.round(value.temp.max)
                    )}
                    startDay={currentDate}
                    isTempFreezing={isTempFreezing}
                />
            </Box>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    flexGrow: "1",
                    alignItems: "end",
                }}
            >
                <Box>
                    <Box
                        dir="ltr"
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                            mt: "17px",
                            justifyContent:
                                i18n.dir() === "rtl" ? "end" : "start",
                        }}
                    >
                        <Typography fontSize="44px">
                            {formatSigned(weatherForecast.current.temp)}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "row",
                                gap: "10px",
                                alignItems: "start",
                            }}
                        >
                            <UnitsToggleButton
                                disableRipple
                                isActive={
                                    preferredUnits === MeasurementSystem.Metric
                                }
                                onClick={() =>
                                    handlePreferredUnitsToggle(
                                        MeasurementSystem.Metric
                                    )
                                }
                            >
                                &deg;C
                            </UnitsToggleButton>
                            <Typography fontSize="22px" lineHeight="1">
                                |
                            </Typography>
                            <UnitsToggleButton
                                disableRipple
                                isActive={
                                    preferredUnits ===
                                    MeasurementSystem.Imperial
                                }
                                onClick={() =>
                                    handlePreferredUnitsToggle(
                                        MeasurementSystem.Imperial
                                    )
                                }
                            >
                                &deg;F
                            </UnitsToggleButton>
                        </Box>
                    </Box>
                    <WeatherMeasurementBagde
                        measurement={t("weatherCard.feelsLike")}
                        value={formatSigned(weatherForecast.current.feels_like)}
                        unit={
                            measurementSystemUnits[preferredUnits].temperature
                        }
                        mainColor="gray.main"
                        unitAdornment="&deg;"
                    />
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "end",
                    }}
                >
                    <WeatherMeasurementBagde
                        measurement={t("weatherCard.wind")}
                        value={weatherForecast.current.wind_speed.toString()}
                        unit={measurementSystemUnits[preferredUnits].speed}
                        highlightColor={
                            isTempFreezing ? "blue.main" : "orange.main"
                        }
                        mainColor="#000"
                    />
                    <WeatherMeasurementBagde
                        measurement={t("weatherCard.humidity")}
                        value={weatherForecast.current.humidity.toString()}
                        unit={measurementSystemUnits[preferredUnits].humidity}
                        highlightColor={
                            isTempFreezing ? "blue.main" : "orange.main"
                        }
                        mainColor="#000"
                    />
                    <WeatherMeasurementBagde
                        measurement={t("weatherCard.pressure")}
                        value={(
                            weatherForecast.current.pressure * 100
                        ).toString()}
                        unit={measurementSystemUnits[preferredUnits].pressure}
                        highlightColor={
                            isTempFreezing ? "blue.main" : "orange.main"
                        }
                        mainColor="#000"
                    />
                </Box>
            </Box>
        </Container>
    );
}

