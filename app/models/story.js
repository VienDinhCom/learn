import mongoose, { Schema } from 'mongoose';

export default mongoose.model('Stories', new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  status: { type: String, default: 'public' },
  allowComments: { type: Boolean, default: true },
  user: { type: Schema.Types.ObjectId, ref: 'Users' },
  date: { type: Date, default: Date.now },
  comments: [{
    commentBody: { type: String, required: true },
    commentDate: { type: Date, default: Date.now },
    commentUser: { type: Schema.Types.ObjectId, ref: 'Users' },
  }],
}));
