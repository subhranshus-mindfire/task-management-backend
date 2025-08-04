import type { Request, Response, NextFunction } from 'express';
import { Project } from '../models/Project.js';
import { ProjectMember } from '../models/ProjectMember.js';
import mongoose from 'mongoose';
import type { AuthRequest } from '../types/type.js';

export const createProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { name, description } = req.body;
    const managerId = req.user?.userId;

    const project = new Project({
      name,
      description,
      managerId,
    });

    await project.save();

    const projectId = project._id

    const member = new ProjectMember({
      projectId,
      userId: managerId,
    });

    await member.save();
    
    res.status(201).json(project);
  } catch (err) {
    next(err);
  }
};

export const addMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, userId } = req.body;

    // Check for existing membership
    const existing = await ProjectMember.findOne({ projectId, userId });
    if (existing) {
      return res.status(409).json({ message: 'Member already added to this project.' });
    }

    const member = new ProjectMember({ projectId, userId });
    await member.save();

    res.status(201).json({ message: 'Member added to the project.', member });
  } catch (err) {
    next(err);
  }
};


export const listProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const projects = await Project.find().populate('managerId');
    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const deleteProject = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const managerId = req.user?.userId;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: 'Project not found.' });
    }

    if (project.managerId.toString() !== managerId) {
      return res.status(403).json({ message: 'Forbidden: only manager can delete this project.' });
    }

    await Project.findByIdAndDelete(id);
    await ProjectMember.deleteMany({ projectId: id });

    res.status(200).json({ message: 'Project and its members deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

export const getProjectsByMemberId = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { memberId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ message: 'Invalid member ID.' });
    }

    const memberships = await ProjectMember.find({ userId: memberId });

    if (!memberships.length) {
      return res.status(404).json({ message: `No projects found for this member.${memberId}` });
    }

    const projectIds = memberships.map((m) => m.projectId);

    const projects = await Project.find({ _id: { $in: projectIds } }).populate('managerId');

    res.json(projects);
  } catch (err) {
    next(err);
  }
};

export const removeMember = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId, memberId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(projectId) || !mongoose.Types.ObjectId.isValid(memberId)) {
      return res.status(400).json({ message: 'Invalid projectId or memberId.' });
    }

    const removed = await ProjectMember.findOneAndDelete({ projectId, userId: memberId });

    if (!removed) {
      return res.status(404).json({ message: 'Membership not found.' });
    }

    res.status(200).json({ message: 'Member removed from project.', removed });
  } catch (err) {
    next(err);
  }
};