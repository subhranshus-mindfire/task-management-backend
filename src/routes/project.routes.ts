import { Router } from 'express';
import {
  createProject,
  addMember,
  listProjects,
  deleteProject,
  getProjectsByMemberId,
  removeMember,
} from '../controllers/project.controller.js';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Projects
 *   description: Project management
 */

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             required:
 *               - name
 *     responses:
 *       201:
 *         description: Project created successfully
 */
router.post('/', authenticate, createProject);

/**
 * @swagger
 * /api/projects/add-member:
 *   post:
 *     summary: Add a member to a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - projectId
 *               - userId
 *     responses:
 *       201:
 *         description: Member added successfully
 */
router.post('/add-member', authenticate, addMember);

/**
 * @swagger
 * /api/projects/remove:
 *   delete:
 *     summary: Remove a member from a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               projectId:
 *                 type: string
 *               userId:
 *                 type: string
 *             required:
 *               - projectId
 *               - userId
 *     responses:
 *       200:
 *         description: Member removed successfully
 */
router.delete('/remove', authenticate, removeMember);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: List all projects for the authenticated user
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get('/', authenticate, listProjects);

/**
 * @swagger
 * /api/projects/by-member/{memberId}:
 *   get:
 *     summary: Get projects by member ID
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: memberId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of projects for the member
 */
router.get('/by-member/:memberId', authenticate, getProjectsByMemberId);

/**
 * @swagger
 * /api/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
router.delete('/:id', authenticate, deleteProject);

export default router;

