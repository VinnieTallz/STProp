import { Router } from 'express';
import { healthController } from '../controllers/index.js';

const router = Router();

// GET /api/health - Basic health check
router.get('/', healthController.getHealth);

// GET /api/health/detailed - Detailed health check
router.get('/detailed', healthController.getDetailedHealth);

// GET /api/health/seam - Seam-specific health check
router.get('/seam', healthController.getSeamHealth);

export default router;