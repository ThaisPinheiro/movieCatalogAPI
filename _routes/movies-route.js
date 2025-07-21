const express = require('express');
const router = express.Router();
const moviesController = require('../_controllers/movies_controller');
const validations = require('../_middlewares/validations');

router.get('/user/:userId',
  moviesController.getAllMovies);

router.get('/user/:userId/favorites',
  validations.validateUser,
  moviesController.getFavoriteMovies);

router.get('/search',
  validations.validateSearchParams,
  moviesController.searchMovie);

router.post('/',
  moviesController.createMovie);

router.patch('/:id/favorite',
  validations.validateFavorite,
  moviesController.updateFavoriteMovie);

router.delete('/:id',
  moviesController.deleteMovie);

// padronizar/centralizar o tratamento de erros
module.exports = router;
