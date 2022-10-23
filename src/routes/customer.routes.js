import {Router} from 'express';
import * as controller from '../controllers/customer.controller';
import * as auth from '../middlewares/auth/authjwt';

// Initialize
const router = Router();

// Implementations
router.delete('/:id', controller._delete);

router.get('/', auth.verifyAccess, controller._get);

router.post('/:id', controller._post);

router.put('/:id', controller._put);

// Export default router 
export default router;
