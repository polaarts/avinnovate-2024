import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: String,
  genres: [String],
  userId: String,  // ID único del usuario si deseas asociarlo a un usuario específico
});

export const Artist = mongoose.models.Artist || mongoose.model('Artist', ArtistSchema);