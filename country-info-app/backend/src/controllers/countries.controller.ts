import { Request, Response } from 'express';
import { fetchAllCountries, fetchCountryByCode } from '../services/countries.service';

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
      res.json(country);
    } catch (error: any) {
      const status = error.message === 'Country not found' ? 404 : 500;
      res.status(status).json({ message: error.message });
    }
  };
