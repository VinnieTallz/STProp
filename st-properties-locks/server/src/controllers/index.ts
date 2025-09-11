import { LocksController } from './Locks.controller.js';
import { HealthController } from './Health.controller.js';

// Export controller classes
export { LocksController } from './Locks.controller.js';
export { HealthController } from './Health.controller.js';

// Export controller instances for easy use in routes
export const locksController = new LocksController();
export const healthController = new HealthController();