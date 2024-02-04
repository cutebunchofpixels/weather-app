import CloseIcon from "@mui/icons-material/Close";
import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Place } from "../../../types/models/Place";
import DailyForecastChart from "./DailyForecarsChart";
import WeatherMeasurementBagde from "./WeatherMeasurementBadge";
import {
    MeasurementSystem,
    RequestPart,
} from "../../../types/dto/WeatherForecastDTO";
import { measurementSystemUnits } from "../../../utils/measurement-system-units";
import dayjs from "dayjs";
import { formatSigned } from "../../../utils/format-signed";
import { useGetWeatherForecastQuery } from "../../../redux/app/api/endpoints/weather/weatherApi";

const Container = styled(Box, {
    shouldForwardProp: (propName) => propName !== "temp",
})<{ temp: number }>(({ theme, temp }) => ({
    backgroundColor:
        temp > 0 ? theme.palette.orange.light : theme.palette.blue.light,
    height: "257px",
    width: "350px",
    boxShadow: theme.shadows[1],
    borderRadius: "5px",
    padding: "10px 15px",
    display: "flex",
    flexDirection: "column",
}));

export default function WeatherCard({ place }: { place: Place }) {
    const preferredUnitsJSON = localStorage.getItem("preferredUnits");
    let preferredUnits: MeasurementSystem = MeasurementSystem.Metric;

    if (preferredUnitsJSON) {
        preferredUnits = JSON.parse(preferredUnitsJSON)[place.placeId];
    }

    const { data: weatherForecast, isFetching: isCurrentForecastFetching } =
        useGetWeatherForecastQuery({
            lat: place.lat,
            lon: place.lng,
            exclude: [RequestPart.Hourly],
            units: preferredUnits,
        });

    if (isCurrentForecastFetching || !weatherForecast) {
        return <Container temp={10}>Loading...</Container>;
    }

    return (
        <Container temp={weatherForecast.current.temp}>
            <IconButton
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
                    <Typography>
                        {place.description.slice(
                            0,
                            place.description.indexOf(",")
                        )}
                    </Typography>
                    <Typography fontSize="18px" fontWeight="300">
                        {dayjs
                            .unix(weatherForecast.current.dt)
                            .format("ddd, DD MMMM, HH:mm")}
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
                            marginInlineEnd: "16px",
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
                        <Typography fontSize="13px" color="gray.main">
                            {weatherForecast.current.weather[0].main}
                        </Typography>
                    </Box>
                </Box>
            </Box>
            <Box sx={{ mt: "16px", height: "65px" }}>
                <DailyForecastChart
                    values={weatherForecast.daily.map((value) =>
                        Math.round(value.temp.max)
                    )}
                    startDay={dayjs.unix(weatherForecast.current.dt)}
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
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            gap: "5px",
                            mt: "17px",
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
                            }}
                        >
                            <Typography fontSize="22px">&deg;C</Typography>
                            <Typography fontSize="22px">|</Typography>
                            <Typography fontSize="22px">&deg;F</Typography>
                        </Box>
                    </Box>
                    <WeatherMeasurementBagde
                        measurement="Feels like"
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
                        measurement="Wind"
                        value={weatherForecast.current.wind_speed.toString()}
                        unit={measurementSystemUnits[preferredUnits].speed}
                        highlightColor="orange.main"
                        mainColor="#000"
                    />
                    <WeatherMeasurementBagde
                        measurement="Humidity"
                        value={weatherForecast.current.humidity.toString()}
                        unit={measurementSystemUnits[preferredUnits].humidity}
                        highlightColor="orange.main"
                        mainColor="#000"
                    />
                    <WeatherMeasurementBagde
                        measurement="Pressure"
                        value={(
                            weatherForecast.current.pressure * 100
                        ).toString()}
                        unit={measurementSystemUnits[preferredUnits].pressure}
                        highlightColor="orange.main"
                        mainColor="#000"
                    />
                </Box>
            </Box>
        </Container>
    );
}

