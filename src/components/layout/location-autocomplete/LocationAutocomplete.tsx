import {
    Autocomplete,
    Box,
    Button,
    InputBase,
    MenuItem,
    styled,
} from "@mui/material";
import { useState } from "react";
import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";
import { Place } from "../../../types/models/Place";
import { TemperatureUnit } from "../../../types/models/TemperatureUnit";

const StyledInput = styled(InputBase)({
    "& .MuiInputBase-input": {
        boxShadow: "#00000029 0 3px 6px",
        padding: "10px 12px",
    },
});

export default function LocationAutocomplete() {
    const [selectedPlace, setSelectedPlace] = useState<{
        placeId: string;
        description: string;
    } | null>(null);

    const {
        value,
        setValue,
        suggestions: { data },
    } = usePlacesAutocomplete({
        debounce: 400,
        requestOptions: {
            types: ["(cities)"],
        },
    });

    return (
        <form
            onSubmit={async (e) => {
                e.preventDefault();

                const results = await getGeocode({
                    placeId: selectedPlace!.placeId,
                });
                const { lat, lng } = getLatLng(results[0]);

                const newPlace: Place = {
                    placeId: selectedPlace!.placeId,
                    description: selectedPlace!.description,
                    lat,
                    lng,
                    prefferedTemperatureUnit: TemperatureUnit.Celsius,
                };

                console.log(newPlace);
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr auto",
                    gap: "10px",
                }}
            >
                <Autocomplete
                    ListboxProps={{
                        sx: {
                            padding: 0,
                        },
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                marginTop: "10px",
                                boxShadow: "#00000029 0 3px 6px",
                            },
                        },
                    }}
                    options={data}
                    forcePopupIcon={false}
                    filterOptions={(o) => o}
                    disableClearable
                    getOptionLabel={(option) => option.description}
                    onInputChange={(event, newInputValue) => {
                        setValue(newInputValue);
                    }}
                    onChange={async (event, newValue) => {
                        setSelectedPlace({
                            placeId: newValue.place_id,
                            description: newValue.description,
                        });
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option.place_id === value.place_id
                    }
                    inputValue={value}
                    renderInput={(params) => {
                        const { InputLabelProps, InputProps, ...rest } = params;
                        return <StyledInput {...params.InputProps} {...rest} />;
                    }}
                    renderOption={(props, option) => {
                        return (
                            <MenuItem {...props} sx={{ padding: "5px" }}>
                                {option.description}
                            </MenuItem>
                        );
                    }}
                />
                <Button
                    type="submit"
                    variant="contained"
                    disabled={selectedPlace === null}
                    sx={{
                        textTransform: "none",
                        py: "10px",
                        px: "43.5px",
                        backgroundColor: "blue.main",
                        boxShadow: "#00000029 0 3px 6px",
                    }}
                >
                    Add
                </Button>
            </Box>
        </form>
    );
}

