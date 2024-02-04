import { Box, Typography } from "@mui/material";

interface WeatherBagdeProps {
    measurement: string;
    value: string;
    unit: string;
    mainColor: string;
    highlightColor?: string;
    unitAdornment?: string;
}

export default function WeatherMeasurementBagde({
    measurement,
    value,
    unit,
    mainColor,
    highlightColor,
    unitAdornment,
}: WeatherBagdeProps) {
    return (
        <Typography
            sx={{
                fontSize: "13px",
                color: mainColor,
            }}
        >
            {measurement}:{" "}
            <Box
                component="span"
                dir="ltr"
                sx={{
                    display: "inline",
                    fontWeight: "600",
                    color: highlightColor,
                }}
            >
                {value} {unitAdornment || ""}
                {unit}
            </Box>
        </Typography>
    );
}

