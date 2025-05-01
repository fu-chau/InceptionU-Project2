import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  title: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  favorites: { type: Number, default: 0 },
  comments: { type: Number, default: 0 },
  camera: {
    description: String,
    url: String,
    quadrant: String,
    location: String
  },
  coordinates: [Number],
  createdAt: { type: Date, default: Date.now }
});

// Avoid model overwrite in dev
export default mongoose.models?.Video || mongoose.model('Video', videoSchema);
