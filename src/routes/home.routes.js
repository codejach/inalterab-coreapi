import {Router} from 'express';
import * as controller from '../controllers/home.controller';

// Initialize
const router = Router();

// Implementations
router.get('/', controller._get);

// Export
export default router;
