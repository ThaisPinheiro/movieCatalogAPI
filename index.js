const express = require('express');
const { connectToDatabase } = require('./_config/infra');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const favoriteRoutes = require('./_routes/movies-route');
const cors = require('cors');
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