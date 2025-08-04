// src/models/Notification.ts
import type { Document } from 'mongoose';
import mongoose, { Schema } from 'mongoose';

export interface INotification extends Document {
  user_id: mongoose.Types.ObjectId;
  task_id: mongoose.Types.ObjectId;
  message: string;
  read: boolean;
  created_at: Date;
}

const NotificationSchema = new Schema<INotification>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  task_id: { type: Schema.Types.ObjectId, ref: 'Task', required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
});

export const Notification = mongoose.model<INotification>(
  'Notification',
  NotificationSchema
);
