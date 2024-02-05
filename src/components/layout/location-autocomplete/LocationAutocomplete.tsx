import {
    Autocomplete,
    Box,
    Button,
    InputBase,
    MenuItem,
    styled,
} from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import usePlacesAutocomplete, { getLatLng } from "use-places-autocomplete";
import { useAppDispatch } from "../../../redux/app/hooks";
import { addPlace } from "../../../redux/features/places/placesSlice";
import { ArrayElement } from "../../../types/helpers/ArrayElement";
import { Place } from "../../../types/models/Place";
import { getCachedGeocode } from "../../../utils/getCachedGeocode";

const StyledInput = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
        boxShadow: theme.shadows[1],
        padding: "10px 12px",
    },
}));

type AutocompletePrediction = ArrayElement<
    ReturnType<typeof usePlacesAutocomplete>["suggestions"]["data"]
>;

export default function LocationAutocomplete() {
    const { t, i18n } = useTranslation();
    const [selectedPlace, setSelectedPlace] =
        useState<AutocompletePrediction | null>(null);
    const dispatch = useAppDispatch();

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

                const geocodeResult = await getCachedGeocode({
                    placeId: selectedPlace!.place_id,
                    language: i18n.resolvedLanguage,
                });

                const { lat, lng } = getLatLng(geocodeResult);

                const newPlace: Place = {
                    placeId: selectedPlace!.place_id,
                    lat,
                    lng,
                };

                dispatch(addPlace(newPlace));
                setSelectedPlace(null);
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
                    value={selectedPlace}
                    disableClearable={selectedPlace !== null}
                    inputValue={value}
                    options={data}
                    forcePopupIcon={false}
                    filterOptions={(o) => o}
                    getOptionLabel={(option) => option.description}
                    noOptionsText={t("locationAutocomplete.noOptions")}
                    onInputChange={(e, newInputValue) => {
                        setValue(newInputValue);
                    }}
                    onChange={async (e, newValue) => {
                        setSelectedPlace(newValue);
                    }}
                    isOptionEqualToValue={(option, value) =>
                        option.place_id === value.place_id
                    }
                    renderInput={(params) => {
                        const { InputLabelProps, InputProps, ...rest } = params;
                        return (
                            <StyledInput
                                {...params.InputProps}
                                {...rest}
                                placeholder={t(
                                    "locationAutocomplete.placeholder"
                                )}
                            />
                        );
                    }}
                    renderOption={(props, option) => {
                        return (
                            <MenuItem {...props} sx={{ padding: "5px" }}>
                                {option.description}
                            </MenuItem>
                        );
                    }}
                    ListboxProps={{
                        sx: {
                            padding: 0,
                        },
                    }}
                    slotProps={{
                        paper: {
                            sx: {
                                marginTop: "10px",
                                boxShadow: 1,
                            },
                        },
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
                        boxShadow: 1,
                    }}
                >
                    {t("locationAutocomplete.addButton")}
                </Button>
            </Box>
        </form>
    );
}

