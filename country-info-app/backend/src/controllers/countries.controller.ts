import { Request, Response } from 'express';
import { fetchAllCountries, fetchCountryByCode, fetchCountriesByRegion, searchCountries } from '../services/countries.service';

export const getAllCountries = async (req: Request, res: Response) => {
  try {
    const countries = await fetchAllCountries();
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch countries!' });
  }
};

export const getCountryByCode = async (req: Request, res: Response) => {
    const { code } = req.params;
    try {
      const country = await fetchCountryByCode(code.toUpperCase());
      res.status(200).json(country);
    } catch (error: any) {
      const status = error.message === 'Country not found' ? 404 : 500;
      res.status(status).json({ message: error.message });
    }
  };

  export const getCountriesByRegion = async (req: Request, res: Response) => {
    const { region } = req.params;
    try {
      const countries = await fetchCountriesByRegion(region);
      res.status(200).json(countries);
    } catch (error: any) {
      const status = error.message === 'Region not found' ? 404 : 500;
      res.status(status).json({ message: error.message });
    }
  };

  export const searchCountriesHandler = async (req: Request, res: Response) => {
    const { name, capital, region, timezone } = req.query;
  
    try {
      const results = await searchCountries({
        name: name as string,
        capital: capital as string,
        region: region as string,
        timezone: timezone as string,
      });
  
      res.status(200).json(results);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
