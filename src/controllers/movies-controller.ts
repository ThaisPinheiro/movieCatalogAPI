import { model as FavoriteMovies } from "../models/movie-model";

const getAllMovies = async (req, res) => {
  const { userId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  const movies = await FavoriteMovies.find({ userId })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await FavoriteMovies.countDocuments({ userId });
  if (!movies || movies.length === 0) {
    return res.status(404).json({ message: "No movies found for this user." });
  }
  res.json({
    movies,
    total,
    page: Number(page),
    totalPages: Math.ceil(total / limit),
  });
};

const getFavoriteMovies = async (req, res) => {
  const { userId } = req.params;

  const favoriteMovies = await FavoriteMovies.find({ userId, favorite: true });

  if (!favoriteMovies || favoriteMovies.length === 0) {
    return res
      .status(404)
      .json({ message: "No favorite movies found for this user." });
  }

  res.json(favoriteMovies);
};

const searchMovie = async (req, res) => {
  const { userId, title } = req.query;

  const safeTitle = title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const movies = await FavoriteMovies.find({
    userId,
    title: new RegExp(`^${safeTitle}$`, "i"),
  });

  if (!movies || movies.length === 0) {
    return res
      .status(404)
      .json({ message: "No movies found for this user with the given title." });
  }
  res.json(movies);
};

const createMovie = async (req, res) => {
  const { userId, movieId, title, posterPath, date, overview, favorite } =
    req.body;

  if (!userId || !title)
    return res.status(400).json({ message: "User and title are required." });

  const movieRegistered = await FavoriteMovies.findOne({ userId, title });
  if (movieRegistered)
    return res
      .status(400)
      .json({
        message: "already has a film registered with this title for this user",
      });

  const newMovie = new FavoriteMovies({
    userId,
    movieId,
    title,
    posterPath,
    date,
    overview,
    favorite: favorite ?? false,
  });

  await newMovie.save();
  res.status(201).json({ newMovie });
};

const updateFavoriteMovie = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const updateMovie = await FavoriteMovies.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );

  if (!updateMovie) {
    return res.status(404).json({ message: "Movie not found." });
  }
  res.json(updateMovie);
};

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  const deletedMovie = await FavoriteMovies.findByIdAndDelete(id);

  if (!deletedMovie) {
    return res.status(404).json({ message: "Movie not found." });
  }
  res.json({ message: "Movie deleted successfully." });
};

export {
  getAllMovies,
  getFavoriteMovies,
  searchMovie,
  createMovie,
  updateFavoriteMovie,
  deleteMovie,
};
