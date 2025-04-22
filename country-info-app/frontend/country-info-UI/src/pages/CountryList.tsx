import { useEffect, useState } from "react";
import { Country } from "../types/country";
import { getAllCountries } from "../services/api";
import CountryCard from "../components/CountryCard";
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
  TextField,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
} from "@mui/material";

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [timezoneFilter, setTimezoneFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch all countries from API
  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); // Initially show all countries
      })
      .catch(() => setError("Failed to fetch countries"))
      .finally(() => setLoading(false));
  }, []);

  // Filter countries based on selected filters
  useEffect(() => {
    let filtered = countries;

    // Filter by region
    if (regionFilter) {
      filtered = filtered.filter((country) => country.region === regionFilter);
    }

    // Filter by timezone
    if (timezoneFilter) {
      filtered = filtered.filter((country) =>
        country.timezones.includes(timezoneFilter)
      );
    }

    // Filter by search query (name or capital)
    if (searchQuery) {
      filtered = filtered.filter((country) =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
  }, [regionFilter, timezoneFilter, searchQuery, countries]);

  const handleRegionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setRegionFilter(event.target.value as string);
  };

  const handleTimezoneChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setTimezoneFilter(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        mt={4}
        display="flex"
        justifyContent="center"
        textAlign="center"
        alignItems="center"
      >
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box
        mb={4}
        position="sticky"
        top={0}
        p={2}
      >
        <Grid container spacing={2} justifyContent="center">
          {/* Search Bar */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Name"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Grid>

          {/* Region Filter */}
          <Grid item xs={12} sm={4} md={3} width='8rem'>
            <FormControl fullWidth>
              <InputLabel>Region</InputLabel>
              <Select
                value={regionFilter}
                onChange={handleRegionChange}
                label="Region"
                fullWidth
              >
                <MenuItem value="">All Regions</MenuItem>
                <MenuItem value="Asia">Asia</MenuItem>
                <MenuItem value="Europe">Europe</MenuItem>
                <MenuItem value="Africa">Africa</MenuItem>
                <MenuItem value="Americas">Americas</MenuItem>
                <MenuItem value="Oceania">Oceania</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Timezone Filter */}
          <Grid item xs={12} sm={4} md={3} width='8rem'>
            <FormControl fullWidth>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={timezoneFilter}
                onChange={handleTimezoneChange}
                label="Timezone"
                fullWidth
              >
                <MenuItem value="">All Timezones</MenuItem>
                {/* Dynamically populate timezone options from countries */}
                {Array.from(
                  new Set(countries.flatMap((country) => country.timezones))
                ).map((timezone) => (
                  <MenuItem key={timezone} value={timezone}>
                    {timezone}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      {/* Display filtered countries */}
      <Grid container spacing={2} justifyContent="center">
        {filteredCountries.map((country) => (
          <Grid item key={country.cca2} xs={12} sm={6} md={4} lg={2.4}>
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CountryList;
