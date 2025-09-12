import { Router } from 'express';
import { locksController } from '../controllers/index';

const router = Router();

// GET /api/locks - Get all locks
router.get('/', locksController.getLocks);

// GET /api/locks/:id - Get specific lock
router.get('/:id', locksController.getLockById);

// POST /api/locks/:id/lock - Lock a device
router.post('/:id/lock', locksController.lockDevice);

// POST /api/locks/:id/unlock - Unlock a device
router.post('/:id/unlock', locksController.unlockDevice);

// GET /api/locks/:id/access-codes - Get access codes for a lock
router.get('/:id/access-codes', locksController.getAccessCodes);

// POST /api/locks/:id/access-codes - Create access code for a lock
router.post('/:id/access-codes', locksController.createAccessCode);

// DELETE /api/locks/:id/access-codes/:codeId - Delete access code
router.delete('/:id/access-codes/:codeId', locksController.deleteAccessCode);

export default router;