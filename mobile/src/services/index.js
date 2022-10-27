import Axios from "axios";
import { LOCAL, TOKEN } from "@env";

export const FindAll = () => {
  return Axios.get(`${LOCAL}:3003/api/streetHole/findAll`);
};

export const GetLocal = (address) => {
  return Axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}%20.json?limit=7&types=postcode%2Caddress&access_token=${TOKEN}`
  );
};
