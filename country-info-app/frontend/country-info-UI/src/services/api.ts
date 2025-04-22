import axios from 'axios';
import { Country } from '../types/country';

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export const getAllCountries = async () => {
  const res = await axios.get(`${API_BASE}/api/countries`);
  return res.data;
};

export const getCountryByCode = async (code: string) => {
  const res = await axios.get(`${API_BASE}/countries/${code}`);
  return res.data;
};

export const getCountriesByRegion = async (region: string) => {
  const res = await axios.get(`${API_BASE}/countries/region/${region}`);
  return res.data;
};

export const searchCountries = async (params: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}) => {
  const query = new URLSearchParams(params as any).toString();
  const res = await axios.get(`${API_BASE}/countries/search?${query}`);
  return res.data;
};
