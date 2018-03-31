import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Users', new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  date: { type: Date, default: Date.now },
}));
