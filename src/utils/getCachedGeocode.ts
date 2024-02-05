import { GeocodeResult, getGeocode } from "use-places-autocomplete";
import { SESSION_STORAGE_GEOCODE_CACHE_KEY } from "./constants";

export async function getCachedGeocode(args: {
    placeId: string;
    language?: string;
}): Promise<GeocodeResult> {
    const queryCacheKey = `${SESSION_STORAGE_GEOCODE_CACHE_KEY}.${JSON.stringify(
        args
    )}`;
    const cachedValueJSON = sessionStorage.getItem(queryCacheKey);

    if (cachedValueJSON) {
        return JSON.parse(cachedValueJSON) as GeocodeResult;
    }

    const geocodeResults = await getGeocode(args);

    sessionStorage.setItem(queryCacheKey, JSON.stringify(geocodeResults[0]));

    return geocodeResults[0];
}

