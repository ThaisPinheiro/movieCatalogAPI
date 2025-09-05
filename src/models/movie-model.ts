import mongoose, { Document, Schema, Model } from 'mongoose';

interface Movie extends Document {
  movieId?: string;
  title?: string;
  posterPath?: string;
  date?: string;
  overview?: string;
  favorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const favoriteMoviesSchema = new mongoose.Schema({
    id: String,
    title: {
        type: String,
        maxlength: 50
    },
    posterPath: String,
    date: String,
    overview: {
        type: String,
        maxlength: 1000
    },
    favorite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

favoriteMoviesSchema.index({ id: 1 }, { unique: true });
const model = mongoose.model('FavoriteMovies', favoriteMoviesSchema);

export {
    Movie,
    model,
}