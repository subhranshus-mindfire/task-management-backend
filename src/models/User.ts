import type mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId
  name: string;
  email: string;
  passwordHash: string;
  role: 'manager' | 'employee';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['manager', 'employee'], required: true, default: 'employee' }
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);
