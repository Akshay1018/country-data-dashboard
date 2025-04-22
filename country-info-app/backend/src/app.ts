import express from 'express';
import countriesRouter from './routes/countries.route';

const app = express();

app.use(express.json());
app.use('/api', countriesRouter);

export default app;
