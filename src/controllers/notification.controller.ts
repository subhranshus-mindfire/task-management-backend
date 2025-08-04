import type { Request, Response } from 'express';
import { Notification } from '../models/Notification.js';
import { Task } from '../models/Task.js';
import type { AuthRequest } from '../types/type.js';
import { ProjectMember } from '../models/ProjectMember.js';

export async function getUserNotifications(req: AuthRequest, res: Response) {
  const userId = req?.user?.userId;

  const notifications = await Notification.find({ user_id: userId }).sort({
    created_at: -1,
  });

  return res.json(notifications);
}

export async function markNotificationRead(req: Request, res: Response) {
  const { id } = req.params;

  await Notification.findByIdAndUpdate(id, { read: true });

  return res.json({ message: 'Marked as read' });
}

export async function checkTasksDueSoon() {
  const now = new Date();
  const soon = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  const tasks = await Task.find({
    dueDate: { $gte: now, $lte: soon },
    status: "incomplete"
  });

  for (const task of tasks) {
    const projectId = task.projectId;
    if (!projectId) { continue; }

    const members = await ProjectMember.find({ projectId });
    for (const member of members) {
      const exists = await Notification.findOne({
        task_id: task._id,
        user_id: member.userId,
        message: `Task "${task.title}" is due in less than 24 hours!`,
      });

      if (!exists) {
        const notification = await Notification.create({
          user_id: member.userId,
          task_id: task._id,
          message: `Task "${task.title}" is due in less than 24 hours!`,
        });
        console.log(notification)
      }
    }
  }
}

export async function getUnreadUserNotificationsCount(req: AuthRequest, res: Response) {
  const userId = req?.user?.userId;

  const notifications = await Notification.find({ user_id: userId, read: false });

  return res.json(notifications.length);
}

