import express from 'express';
import countriesRouter from './routes/countries.route';
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', countriesRouter);

export default app;
