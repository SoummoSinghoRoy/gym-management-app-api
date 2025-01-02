import { Schema, model } from "mongoose";
import { IUser } from "../Types/model.types";

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    required: true,
    lowercase: true,
    enum: ['admin', 'trainee']
  }
}, {
  timestamps: true
})

const User = model<IUser>('User', userSchema);

export default User;