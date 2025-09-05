import { FilterQuery } from "mongoose";
import { Movie, model as movieModel } from "../models/movie";

export class MovieService {
  find(param: FilterQuery<Movie>): Promise<Movie[]> {
    try {
      return movieModel.find(param);
    } catch (error) {
      throw new Error("Error fetching movies");
    }
  }

  async getAllMovies(page: number = 1, limit: number = 10): Promise<{ movies: Movie[]; total: number; totalPages: number }> {
    try {
      const movies = await movieModel.find({})
                               .skip((page - 1) * limit)
                               .limit(limit);
      const total = await movieModel.countDocuments();

      if (!movies || movies.length === 0) throw new Error("No movies found.");

      return Promise.resolve({ movies, total, totalPages: Math.ceil(total / limit) });
    } catch (error) {
      throw new Error("Error fetching all movies.");
    }
  }

  async getFavoriteMovies(): Promise<Movie[]> {
    try {
      const favoriteMovies = await this.find({ favorite: true });
      if (!favoriteMovies || favoriteMovies.length === 0) throw new Error("No favorite movies found.");
      
      return favoriteMovies;
    } catch (error) {
      throw new Error("Error fetching favorite movies.");
    }
  }

  async searchMovie(title: string): Promise<Movie[]> {
    try {
      if(!title) throw new Error("Title is required for search.");
      
      const safeTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const movies = await movieModel.find({ title: new RegExp(safeTitle, "i") });

      if(!movies || movies.length === 0) throw new Error("No movies found with the given title.");

      return movies;
    } catch (error) {
      throw new Error("Error searching movie.");
    }
  }

  createMovie(movieData: Partial<Movie>): Promise<Movie> {
    try {
    if (!movieData.title) throw new Error("Title are required." );

    const existingMovie = movieModel.findOne({ title: movieData.title });
    if (existingMovie) throw new Error("A movie with this title already exists.");
    
    const newMovie = new movieModel(movieData);
    return newMovie.save();
    } catch (error) {
      throw new Error("Error creating movie.");
    }
  }
  
  updateFavoriteMovie(id: string, favorite: boolean): Promise<Movie | null> {
    try {
      const updateMovie = movieModel.findByIdAndUpdate(
        id,
        { favorite },
        { new: true } //TODO: Verificar o que é isso
      );

      if (!updateMovie) throw new Error("Movie not found.");
      return updateMovie;
    } catch (error) {
      throw new Error("Error updating movie.");
    }
  }

  deleteMovie(id: string): Promise<Movie | null> {
    try {
      const deletedMovie = movieModel.findByIdAndDelete(id);
      if (!deletedMovie) throw new Error("Movie not found.");
      return deletedMovie;
    } catch (error) {
      throw new Error("Error deleting movie.");
    }
  }
}