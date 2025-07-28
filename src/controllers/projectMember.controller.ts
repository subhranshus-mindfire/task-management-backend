import type { Request, Response, NextFunction } from 'express';
import { ProjectMember } from '../models/ProjectMember.js';

import mongoose from 'mongoose';

export const listMembersByProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({ message: 'Invalid project ID.' });
    }

    const members = await ProjectMember.find({ projectId }).populate('userId', '-passwordHash');

    res.json(members);
  } catch (err) {
    next(err);
  }
};


