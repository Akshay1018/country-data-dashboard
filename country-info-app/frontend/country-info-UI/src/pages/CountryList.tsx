import { useEffect, useState } from 'react';
import { Country } from '../types/country';
import { getAllCountries } from '../services/api';
import CountryCard from '../components/CountryCard';
import {
  Grid,
  CircularProgress,
  Typography,
  Box,
} from '@mui/material';

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllCountries()
      .then(setCountries)
      .catch(() => setError('Failed to fetch countries'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Grid container spacing={2} justifyContent="center">
        {countries.map((country) => (
          <Grid
            item
            key={country.cca2}
            xs={12}
            sm={6}
            md={4}
            lg={2.4}
          >
            <CountryCard country={country} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CountryList;
