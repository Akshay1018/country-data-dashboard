import axios from 'axios';

const COUNTRIES_URL = "https://restcountries.com/v3.1/all";

export const fetchAllCountries = async () => {
  try {
    const response = await axios.get(COUNTRIES_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw new Error('Failed to fetch countries');
  }
};

export const fetchCountryByCode = async (code: string) => {
    try {
      const url = `https://restcountries.com/v3.1/alpha/${code}`;
      const response = await axios.get(url);
      const country = response.data;
      return country;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Country not found');
      }
      throw new Error('Failed to fetch country by code');
    }
  };
  
