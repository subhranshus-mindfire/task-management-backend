import type { Document, Types } from 'mongoose';
import type mongoose from 'mongoose';
import { Schema, model } from 'mongoose';
import { StatusEnum } from '../enums/status.enum.js';

export interface ITask extends Document {
  _id: mongoose.Types.ObjectId
  projectId: Types.ObjectId;
  createdBy: Types.ObjectId;
  title: string;
  description?: string;
  status: StatusEnum;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<ITask>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: String,
    status: { type: String, enum: Object.values(StatusEnum), default: StatusEnum.INCOMPLETE },
    dueDate: Date,
  },
  { timestamps: true }
);

export const Task = model<ITask>('Task', taskSchema);
