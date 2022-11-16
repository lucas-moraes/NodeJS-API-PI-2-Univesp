import axios from 'axios';
import {LOCAL, GOOGLE_TOKEN} from '@env';

export function FindAll() {
  return axios.get(`${LOCAL}/api/streetHole/findAll`);
}

export function SendPass(email, password) {
  return axios.post(`${LOCAL}/api/users/login`, {
    email: email,
    password: password,
  });
}

export function SendFormData(data) {
  return axios.post(`${LOCAL}/api/streetHole/create`, data);
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
