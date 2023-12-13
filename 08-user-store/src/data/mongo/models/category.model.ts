import mongoose, { Schema } from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const CategoryModel = mongoose.model('Category', CategorySchema);
