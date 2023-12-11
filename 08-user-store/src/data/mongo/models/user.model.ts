import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },

  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
  },

  password: {
    type: String,
    required: [true, 'password is required'],
  },

  img: {
    type: String,
  },

  role: {
    type: [String],
    default: ['USER_ROLE'],
    enum: ['ADMIN_ROLE', 'USER_ROLE'],
  },
});

export const UserModel = mongoose.model('User', UserSchema);