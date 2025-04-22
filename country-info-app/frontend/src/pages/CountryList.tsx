import { lazy, Suspense, useEffect, useState } from "react";
import { Country } from "../types/country";
import { getAllCountries } from "../services/api";
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

const CountryCard = lazy(() => import("../components/CountryCard"));

const BATCH_SIZE = 50;

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [visibleCountries, setVisibleCountries] = useState<Country[]>([]);
  const [currentIndex, setCurrentIndex] = useState(BATCH_SIZE);

  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [timezoneFilter, setTimezoneFilter] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Fetch all countries
  useEffect(() => {
    getAllCountries()
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data);
        setVisibleCountries(data.slice(0, BATCH_SIZE));
      })
      .catch(() => setError("Failed to fetch countries"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let filtered = countries;

    if (regionFilter) {
      filtered = filtered.filter((country) => country.region === regionFilter);
    }

    if (timezoneFilter) {
      filtered = filtered.filter((country) =>
        country.timezones.includes(timezoneFilter)
      );
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (country) =>
          country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          country.capital.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCountries(filtered);
    setVisibleCountries(filtered.slice(0, BATCH_SIZE));
    setCurrentIndex(BATCH_SIZE);
  }, [regionFilter, timezoneFilter, searchQuery, countries]);

  // Handle infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

      if (
        nearBottom &&
        !loadingMore &&
        currentIndex < filteredCountries.length
      ) {
        setLoadingMore(true);
        setTimeout(() => {
          const nextIndex = currentIndex + BATCH_SIZE;
          const more = filteredCountries.slice(currentIndex, nextIndex);
          setVisibleCountries((prev) => [...prev, ...more]);
          setCurrentIndex(nextIndex);
          setLoadingMore(false);
        }, 500);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [filteredCountries, currentIndex, loadingMore]);

  const handleRegionChange = (event: any) => {
    setRegionFilter(event.target.value as string);
  };

  const handleTimezoneChange = (event: any) => {
    setTimezoneFilter(event.target.value as string);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  if (loading) {
    return (
      <Box height="100vh" display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} display="flex" justifyContent="center" textAlign="center" alignItems="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box mb={4} position="sticky" top={0} zIndex={1} bgcolor="#fff" p={2}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              fullWidth
              label="Search by Name/Capital"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </Grid>

          <Grid item xs={12} sm={4} md={3} width='8rem'>
            <FormControl fullWidth>
              <InputLabel>Region</InputLabel>
              <Select
                value={regionFilter}
                onChange={handleRegionChange}
                label="Region"
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

          <Grid item xs={12} sm={4} md={3} width='8rem'>
            <FormControl fullWidth>
              <InputLabel>Timezone</InputLabel>
              <Select
                value={timezoneFilter}
                onChange={handleTimezoneChange}
                label="Timezone"
              >
                <MenuItem value="">All Timezones</MenuItem>
                {Array.from(
                  new Set(countries.flatMap((c) => c.timezones))
                ).map((tz) => (
                  <MenuItem key={tz} value={tz}>
                    {tz}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={2} justifyContent="center">
        {visibleCountries.map((country) => (
          <Grid item key={country.cca2} xs={12} sm={6} md={4} lg={2.4}>
            <Suspense fallback={<div>Loading...</div>}>
              <CountryCard country={country} />
            </Suspense>
          </Grid>
        ))}
      </Grid>

      {loadingMore && (
        <Box mt={4} textAlign="center">
          <Typography variant="body1">Loading...</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CountryList;
