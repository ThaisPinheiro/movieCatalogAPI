import express from 'express';
import { connectToDatabase } from './infra/database';
import mongoSanitize from 'express-mongo-sanitize';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/error-handler';
import favoriteRoutes from './routes/movies-route';
import cors from 'cors';
require('dotenv').config();

const app = express();

const searchLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: 'Too many requests, please try again later.'
})

app.use(mongoSanitize());
app.use(searchLimiter);
app.use(cors());
app.use(express.json());
app.use(errorHandler);
app.use('/api/movies', favoriteRoutes);

connectToDatabase().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on port ${process.env.PORT}`);
  })
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error.' });
});