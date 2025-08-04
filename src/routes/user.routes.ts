// In routes/user.routes.ts
import { Router } from 'express';
import { User } from '../models/User.js';

const router = Router();

router.get('/search', async (req, res) => {
  const query = req.query.query as string;
  if (!query) { return res.status(400).json({ message: 'No query provided' }); }

  const users = await User.find({
    email: { $regex: query, $options: 'i' },
    role: 'employee',
  }).limit(10);

  res.json(users);
});

export default router;
