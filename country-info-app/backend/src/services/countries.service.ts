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
    const countries = response.data.map((country: any) => ({
      name: country.name?.common || "N/A",
      population: country.population || 0,
      flag: country.flags?.svg || "",
      region: country.region || "N/A",
      currency: country.currencies || "N/A",
      code: country.cca2 || "N/A",
      capital: country.capital?.[0] || "N/A",
      timezones: country.timezones || [],
    }));

    cache.set(cacheKey, countries);
    return countries;
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
    const country = response.data[0];

    const processed = {
      name: country.name?.common || "N/A",
      population: country.population || 0,
      flag: country.flags?.svg || "",
      region: country.region || "N/A",
      currency: country.currencies || "N/A",
      code: country.cca2 || "N/A",
      capital: country.capital?.[0] || "N/A",
      timezones: country.timezones || [],
    };

    cache.set(cacheKey, processed);
    return processed;
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
    const countries = response.data.map((country: any) => ({
      name: country.name?.common || "N/A",
      population: country.population || 0,
      flag: country.flags?.svg || "",
      region: country.region || "N/A",
      currency: country.currencies || "N/A",
      code: country.cca2 || "N/A",
      capital: country.capital?.[0] || "N/A",
      timezones: country.timezones || [],
    }));
    cache.set(cacheKey, countries);
    return countries;
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
    const allCountries = data.map((country: any) => ({
      name: country.name?.common || "N/A",
      population: country.population || 0,
      flag: country.flags?.svg || "",
      region: country.region || "N/A",
      currency: country.currencies || "N/A",
      code: country.cca2 || "N/A",
      capital: country.capital?.[0] || "N/A",
      timezones: country.timezones || [],
    }));

    const filtered = allCountries.filter((c:any) => {
        const nameMatch = query.name ? c.name.toLowerCase().includes(query.name.toLowerCase()) : true;
        const capitalMatch = query.capital ? c.capital?.toLowerCase().includes(query.capital.toLowerCase()) : true;
        const regionMatch = query.region ? c.region.toLowerCase() === query.region.toLowerCase() : true;
        const timezoneMatch = query.timezone
          ? c.timezones?.some((tz: string) => tz === query.timezone)
          : true;
  
        return nameMatch && capitalMatch && regionMatch && timezoneMatch;
      });
    cache.set(cacheKey, filtered);
    return filtered;
  } catch (error) {
    throw new Error("Failed to search countries");
  }
};
