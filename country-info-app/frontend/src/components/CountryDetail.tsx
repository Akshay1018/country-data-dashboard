import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCountryByCode } from '../services/api';
import {
  Box,
  Typography,
  CircularProgress,
  Card,
  Grid,
  Avatar,
  Paper,
} from '@mui/material';

interface CountryDetail {
  name: string;
  population: number;
  flag: string;
  region: string;
  currency: Record<string, { symbol: string; name: string }>;
  code: string;
  capital: string;
  timezones: string[];
}

const CountryDetail = () => {
  const { code } = useParams<{ code: string }>();
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      getCountryByCode(code)
        .then(setCountry)
        .catch(() => setError('Country not found'))
        .finally(() => setLoading(false));
    }
  }, [code]);

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

  if (error || !country) {
    return (
      <Box mt={4} display="flex" justifyContent="center">
        <Typography color="error">{error || 'No country data available'}</Typography>
      </Box>
    );
  }

  const currencyDetails = Object.entries(country.currency).map(
    ([code, { symbol, name }]) => `${name} (${symbol})`
  );

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={6} px={2}>
      <Card
        elevation={4}
        sx={{
          p: 3,
          width: '100%',
          borderRadius: 4,
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={4} md={3} display="flex" justifyContent="center">
            <Avatar
              src={country.flag}
              alt={`Flag of ${country.name}`}
              sx={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                boxShadow: 3,
              }}
            />
          </Grid>

          <Grid item xs={12} sm={8} md={9}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              {country.name}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Capital:</strong> {country.capital}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Region:</strong> {country.region}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Population:</strong> {country.population.toLocaleString()}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Timezones:</strong> {country.timezones.join(', ')}
            </Typography>

            <Typography variant="body1" gutterBottom>
              <strong>Currency:</strong> {currencyDetails.join(', ')}
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default CountryDetail;
