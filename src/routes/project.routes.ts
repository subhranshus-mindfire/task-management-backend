import { Router } from 'express';
import {
  createProject,
  addMember,
  listProjects,
  deleteProject,
  getProjectsByMemberId
} from '../controllers/project.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', authenticate, createProject);
router.post('/add-member', authenticate, addMember);
router.get('/', authenticate, listProjects);
router.get('/by-member/:memberId', authenticate, getProjectsByMemberId); 
router.delete('/:id', authenticate, deleteProject);

export default router;
