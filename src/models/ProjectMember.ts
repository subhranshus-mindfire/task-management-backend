import type { Document, Types } from 'mongoose';
import { Schema, model } from 'mongoose';

export interface IProjectMember extends Document {
  projectId: Types.ObjectId;
  userId: Types.ObjectId;
  joinedAt: Date;
}

const projectMemberSchema = new Schema<IProjectMember>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    joinedAt: { type: Date, default: Date.now },
  }
);

export const ProjectMember = model<IProjectMember>('ProjectMember', projectMemberSchema);
