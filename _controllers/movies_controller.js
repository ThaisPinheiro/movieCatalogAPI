const FavoriteMovies = require('../_models/favorite-movies-model');

const getAllMovies = async (req, res) => {
  const { userId } = req.params;

  try {
      const movies = await FavoriteMovies.find({ userId });

      if (!movies || movies.length === 0) {
          return res.status(404).json({ message: 'No movies found for this user.' });
      }
      res.json(movies);
  } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Error fetching movies.' });
  }
}

const getFavoriteMovies = async (req, res) => {
  const { userId } = req.params;

  try {
    const favoriteMovies = await FavoriteMovies.find({ userId, favorite: true });

    if (!favoriteMovies || favoriteMovies.length === 0) {
        return res.status(404).json({ message: 'No favorite movies found for this user.' });
    }

    res.json(favoriteMovies);
  } catch (error) {
    console.error('Error searching for favorite movies:', error);
    res.status(500).json({ message: 'Error searching for favorite movies' });
  }
}

const searchMovie = async (req, res) => {
  const { userId, title } = req.query;

  try {
      const safeTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const movies = await FavoriteMovies.find({ userId, title: new RegExp(`^${safeTitle}$`, 'i') });
      
      if (!movies || movies.length === 0) {
          return res.status(404).json({ message: 'No movies found for this user with the given title.' });
      }
      res.json(movies);
  } catch (error) {
      console.error('Error searching for movies:', error);
      res.status(500).json({ message: 'Error searching for movies.' });
  }
}

const createMovie = async (req, res) => {
  const { userId, movieId, title, posterPath, date, overview, favorite } = req.body;

  try {
      if (!userId || !title) return res.status(400).json({message: 'User and title are required.'});

      const movieRegistered = await FavoriteMovies.findOne({ userId, title });
      if (movieRegistered) return res.status(400).json({message: 'already has a film registered with this title for this user'});

      const newMovie = new FavoriteMovies ({
          userId,
          movieId,
          title,
          posterPath,
          date,
          overview,
          favorite: favorite ?? false
      });

      await newMovie.save();
      res.status(201).json({ newMovie });
  } catch (error) {
      if (error.code === 11000) {
          return res.status(409).json({
            message: 'Already has a film registered with this title for this user.', erro: error.message
          });
      }
      return res.status(500).json({message: 'Error registering new film'});
  }
}

const updateFavoriteMovie = async (req, res) => {
  const { id } = req. params;
  const { favorite } = req. body;

  try {
      const updateMovie = await FavoriteMovies.findByIdAndUpdate(
          id,
          { favorite },
          { new: true }
      );

  if (!updateMovie) {
      return res.status(404).json({ message: 'Movie not found.' });
  }
  res.json(updateMovie);
  } catch (error) {
      console.error('Error updating movie:', error);
      res.status(500).json({ message: 'Error updating movie.' });
  }
}

const deleteMovie = async (req, res) => {
  const { id } = req.params;

  try {
      const deletedMovie = await FavoriteMovies.findByIdAndDelete(id);

      if (!deletedMovie) {
          return res.status(404).json({ message: 'Movie not found.' });
      }
      res.json({ message: 'Movie deleted successfully.' });
  } catch (error) {
      console.error('Error deleting movie:', error);
      res.status(500).json({ message: 'Error deleting movie.' });
  }
}

module.exports = {
  getAllMovies,
  getFavoriteMovies,
  searchMovie,
  createMovie,
  updateFavoriteMovie,
  deleteMovie
};