import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(errorMiddleware);

app.use('/api/auth', authRoutes);

export default app;
