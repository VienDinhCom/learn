import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Users', new Schema({
  googleID: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  image: { type: String },
}));
