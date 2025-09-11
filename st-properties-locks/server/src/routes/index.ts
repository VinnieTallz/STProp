import { Router } from 'express';
import locksRouter from './locks.routes.js';
import healthRouter from './health.routes.js';

const router = Router();

// Mount route modules
router.use('/locks', locksRouter);
router.use('/health', healthRouter);

export default router;