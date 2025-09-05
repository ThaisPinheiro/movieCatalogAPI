import { model } from "mongoose";
import { Request, Response } from "express";
import { model as Movie } from "../models/movie";
import { MovieService } from "../services/movie";

const movieService = new MovieService();

const getAllMovies = (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query;
  const result = movieService.getAllMovies(Number(page), Number(limit));
  res.json({ result });
};

const getFavoriteMovies = (req: Request, res: Response) => {
  const favoriteMovies = movieService.getFavoriteMovies();
  res.json(favoriteMovies);
};

const searchMovie = (req: Request, res: Response) => {
  const { title } = req.query as { title: string};
  const movies = movieService.searchMovie(title);
  res.json(movies);
};

const createMovie = (req: Request, res: Response) => {
  const movieData = req.body;
  const newMovie = movieService.createMovie(movieData);
  res.status(201).json({ newMovie });
};

const updateFavoriteMovie = (req: Request, res: Response) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const updateMovie = movieService.updateFavoriteMovie(id, favorite);
  res.status(201).json(updateMovie);
};

const deleteMovie = (req: Request, res: Response) => {
  const { id } = req.params;
  movieService.deleteMovie(id);
  res.status(201).json({ message: "Movie deleted successfully." });
};

export {
  getAllMovies,
  getFavoriteMovies,
  searchMovie,
  createMovie,
  updateFavoriteMovie,
  deleteMovie,
};
