import {Router} from 'express';
import * as controller from '../controllers/utility.controller';

// Initialize
const router = Router();

// Implementations
router.get('/ping', controller._get);

// Export
export default router;
