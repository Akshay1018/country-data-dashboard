import { Router } from 'express';
import { getAllCountries,getCountryByCode } from '../controllers/countries.controller';

const router = Router();

router.get('/countries', getAllCountries);
router.get('/country/:code', getCountryByCode);

export default router;
