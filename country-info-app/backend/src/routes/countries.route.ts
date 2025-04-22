import { Router } from 'express';
import { getAllCountries,getCountryByCode, getCountriesByRegion, searchCountriesHandler } from '../controllers/countries.controller';

const router = Router();

router.get('/countries', getAllCountries);
router.get('/country/:code', getCountryByCode);
router.get('/country/region/:region', getCountriesByRegion);
router.get('/countries/search', searchCountriesHandler);

export default router;
