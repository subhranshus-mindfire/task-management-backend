import { Router } from 'express';
import { getUnreadUserNotificationsCount, getUserNotifications, markNotificationRead } from '../controllers/notification.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticate, getUserNotifications);
router.patch('/:id/read', authenticate, markNotificationRead);
router.get('/getNotifications', authenticate, getUnreadUserNotificationsCount);


export default router;
