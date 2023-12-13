import mongoose from 'mongoose';
import { bcryptAdapter } from '../../../config';

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'name is required'],
    },

    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },

    emailValidated: {
      type: Boolean,
      default: false,
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
  },
  {
    statics: {
      hashPassword(password: string) {
        return bcryptAdapter.hash(password);
      },
    },
    methods: {
      comparePassword(password: string) {
        return bcryptAdapter.compare(password, this.password);
      },
    },
  }
);

export const UserModel = mongoose.model('User', UserSchema);
