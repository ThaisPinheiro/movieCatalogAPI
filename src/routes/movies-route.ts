import express from 'express';
const router = express.Router();
import * as moviesController from '../controllers/movies-controller';
import * as validations from '../middlewares/validations';

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

export default router;