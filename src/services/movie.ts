import { Movie, model as movieModel } from "../models/movie-model";

export class MovieService {
  find(param: Movie): Promise<Movie[]> {
    return movieModel.find(params);
  }

  getAllMovies(userId) {
    // return await FavoriteMovies.find({ userId });
    return this.find({ userId });
  }

  getFavoriteMovies(userId) {
    // return await FavoriteMovies.find({ userId, favorite: true });
    return this.find({ userId, favorite: true });
  }

  searchMovie(userId, title) {
    return await movieModel.find({
      userId,
      title: { $regex: title, $options: "i" },
    });
  }
}