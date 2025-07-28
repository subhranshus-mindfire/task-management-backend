
import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from './config/swagger.js';
import authRoutes from './routes/auth.routes.js';
import projectRoutes from "./routes/project.routes.js"
import projectMemberRoutes from './routes/projectMember.routes.js';
import taskRoutes from './routes/task.routes.js';
import cookieParser from "cookie-parser";


const app: Application = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/project-members', projectMemberRoutes);
app.use('/api/tasks', taskRoutes);


export default app;
