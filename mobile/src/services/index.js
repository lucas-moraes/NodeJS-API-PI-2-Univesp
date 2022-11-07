import axios from 'axios';
import {LOCAL, GOOGLE_TOKEN} from '@env';

export function FindAll() {
  return axios.get('https://pi-2-2022.onrender.com/api/streetHole/findAll');
}

export function GetLocal(address) {
  const params = new URLSearchParams({
    input: address,
    key: GOOGLE_TOKEN,
  });
  const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?${params}`;
  return axios.get(url);
}

export function GetGeocode(address) {
  const params = new URLSearchParams({
    address: address,
    key: GOOGLE_TOKEN,
  });
  const url = `https://maps.googleapis.com/maps/api/geocode/json?${params}`;
  return axios.post(url);
}

export function SendFormData(data) {
  return axios.post(`${LOCAL}/api/streetHole/create`, data);
}
