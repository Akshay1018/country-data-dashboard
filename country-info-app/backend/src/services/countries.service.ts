import axios from "axios";
import qs from "qs";
import cache from "../utils/cache";

const COUNTRIES_URL = "https://restcountries.com/v3.1/all";

// fetch all countries
// GET
export const fetchAllCountries = async () => {
  const cacheKey = "allCountries";
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  try {
    const response = await axios.get(COUNTRIES_URL);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw new Error("Failed to fetch countries");
  }
};

// fetch countries by Code
// GET
export const fetchCountryByCode = async (code: string) => {
  const cacheKey = `country:${code.toUpperCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  try {
    const url = `https://restcountries.com/v3.1/alpha/${code}`;
    const response = await axios.get(url);
    const country = response.data;
    cache.set(cacheKey, country);
    return country;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Country not found");
    }
    throw new Error("Failed to fetch country by code");
  }
};

// fetch countries by Region
//GET
export const fetchCountriesByRegion = async (region: string) => {
  const cacheKey = `region:${region.toLowerCase()}`;
  const cached = cache.get(cacheKey);
  if (cached) {
    return cached;
  }
  try {
    const url = `https://restcountries.com/v3.1/region/${region}`;
    const response = await axios.get(url);
    cache.set(cacheKey, response.data);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Region not found");
    }
    throw new Error("Failed to fetch countries by region");
  }
};

// search countries by region, timezone and capital
// GET
export const searchCountries = async (query: {
  name?: string;
  capital?: string;
  region?: string;
  timezone?: string;
}) => {
  try {
    const cacheKey = `search:${qs.stringify(query, {
      sort: (a, b) => a.localeCompare(b),
    })}`;

    const cached = cache.get(cacheKey);
    if (cached) {
      return cached;
    }
    const response = await axios.get(COUNTRIES_URL);
    const data = response.data;

    const filtered = data.filter((country: any) => {
      const matchName = query.name
        ? country.name?.common?.toLowerCase().includes(query.name.toLowerCase())
        : true;

      const matchCapital = query.capital
        ? country.capital?.[0]
            ?.toLowerCase()
            .includes(query.capital.toLowerCase())
        : true;

      const matchRegion = query.region
        ? country.region?.toLowerCase() === query.region.toLowerCase()
        : true;

      const matchTimezone = query.timezone
        ? (country.timezones || []).includes(query.timezone)
        : true;

      return matchName && matchCapital && matchRegion && matchTimezone;
    });
    cache.set(cacheKey, filtered);
    return filtered;
  } catch (error) {
    throw new Error("Failed to search countries");
  }
};
