import type { Document, Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description?: string;
  managerId: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    name: { type: String, required: true },
    description: String,
    managerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);
