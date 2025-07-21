const mongoose = require('mongoose');

const favoriteMoviesSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    movieId: String,
    title: String,
    posterPath: String,
    date: String,
    overview: String,
    favorite: {
        type: Boolean,
        default: false
    }
});

favoriteMoviesSchema.index({ userId: 1, title: 1 }, { unique: true });

module.exports = mongoose.model('FavoriteMovies', favoriteMoviesSchema);