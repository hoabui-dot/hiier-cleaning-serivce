import { LatLng } from "../../types/ui";
import { GOOGLE_API_KEY } from "../../utils/constants/ui";

export const reverseGeocoding = async ({ latitude, longitude }: LatLng) => {
  const res = await fetch(
    'https://maps.googleapis.com/maps/api/geocode/json?latlng=' +
      latitude +
      ',' +
      longitude +
      '&location_type=ROOFTOP' +
      '&result_type=street_address' +
      '&key=' +
      GOOGLE_API_KEY
  ).then((response) => response.json());
  return res.results[0];
};