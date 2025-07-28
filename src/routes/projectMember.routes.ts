import { Router } from 'express';
import {
  listMembersByProject
} from '../controllers/projectMember.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: ProjectMembers
 *   description: Manage project members
 */

/**
 * @swagger
 * /api/project-members/{projectId}/members:
 *   get:
 *     summary: List all members of a project
 *     tags: [ProjectMembers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the project
 *     responses:
 *       200:
 *         description: List of members for the project
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   projectId:
 *                     type: string
 *                   userId:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       role:
 *                         type: string
 *                   joinedAt:
 *                     type: string
 *                     format: date-time
 */
router.get('/:projectId/members', authenticate, listMembersByProject);

export default router;
