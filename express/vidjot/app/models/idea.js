import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Ideas', new Schema({
  title: { type: String, required: true },
  details: { type: String, required: true },
  date: { type: Date, default: Date.now },
}));
