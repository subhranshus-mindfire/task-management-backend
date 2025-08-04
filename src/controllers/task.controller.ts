import type { Request, Response, NextFunction } from 'express';
import { Task } from '../models/Task.js';
import type { AuthRequest } from '../types/type.js';
import { ProjectMember } from '../models/ProjectMember.js';

export const createTask = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { projectId, title, description, dueDate } = req.body;
    const createdBy = req.user?.userId;

    const task = new Task({
      projectId,
      createdBy,
      title,
      description,
      dueDate,
    });

    await task.save();

    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
};

export const getTasksByProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ projectId });
    res.status(200).json(tasks);
  } catch (err) {
    next(err);
  }
};

export const updateTaskStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await Task.findByIdAndUpdate(
      taskId,
      { status },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json(task);
  } catch (err) {
    next(err);
  }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (err) {
    next(err);
  }
};

export const getTasksByMember = async (req: AuthRequest, res: Response) => {
  try {
    const { userId } = req.params;

    const memberships = await ProjectMember.find({ userId });
    const projectIds = memberships.map((m) => m.projectId);

    const tasks = await Task.find({ projectId: { $in: projectIds } })
      .populate({
        path: 'projectId',
        select: 'name description', 
      })
      .populate({
        path: 'createdBy',
        select: 'name email', 
      });

    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

