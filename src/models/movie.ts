import mongoose, { Document, Schema, Model } from 'mongoose';

interface Movie extends Document {
	_id: mongoose.Types.ObjectId;  title?: string;
  posterPath?: string;
  releaseDate?: string;
  overview?: string;
  favorite: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const movieSchema = new mongoose.Schema({
   	_id: {
      type: mongoose.Schema.Types.ObjectId,
      auto: true,
    },
    title: {
        type: String,
        maxlength: 50
    },
    posterPath: String,
    releaseDate: String,
    overview: {
        type: String,
        maxlength: 1000
    },
    favorite: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const model = mongoose.model<Movie>('Movie', movieSchema);

export {
    Movie,
    model,
}