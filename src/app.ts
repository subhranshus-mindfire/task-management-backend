
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { setupSwagger } from './config/swagger';
import authRoutes from './routes/auth.routes';

const app: Application = express();

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

setupSwagger(app);

app.use('/api/auth', authRoutes);

export default app;
