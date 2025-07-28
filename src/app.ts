
import express from 'express';
import type { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from './config/swagger';
import authRoutes from './routes/auth.routes';
import projectRoutes from "./routes/project.routes"

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);


export default app;
