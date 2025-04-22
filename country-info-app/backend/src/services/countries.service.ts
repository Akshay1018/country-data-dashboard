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

  export const fetchCountriesByRegion = async (region: string) => {
    try {
      const url = `https://restcountries.com/v3.1/region/${region}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      if (error.response?.status === 404) {
        throw new Error('Region not found');
      }
      throw new Error('Failed to fetch countries by region');
    }
  };

  export const searchCountries = async (query: {
    name?: string;
    capital?: string;
    region?: string;
    timezone?: string;
  }) => {
    try {
      const response = await axios.get(COUNTRIES_URL);
      const data = response.data;
  
      const filtered = data.filter((country: any) => {
        const matchName = query.name
          ? country.name?.common?.toLowerCase().includes(query.name.toLowerCase())
          : true;
  
        const matchCapital = query.capital
          ? country.capital?.[0]?.toLowerCase().includes(query.capital.toLowerCase())
          : true;
  
        const matchRegion = query.region
          ? country.region?.toLowerCase() === query.region.toLowerCase()
          : true;
  
        const matchTimezone = query.timezone
          ? (country.timezones || []).includes(query.timezone)
          : true;
  
        return matchName && matchCapital && matchRegion && matchTimezone;
      });
  
      return filtered;
    } catch (error) {
      throw new Error('Failed to search countries');
    }
  };
  
  
