import { Router } from 'express';
import * as controller from '../controllers/user.controller';
import * as auth from '../middlewares/auth/authjwt';
import * as validate from '../middlewares/validation/user.validation';

// Initialize
const router = Router();

// Implementations
router.delete('/:id'
  , [ auth.verifyPermissions, validate.del ]
  , controller._delete);

router.get('/'
  , [ auth.verifyPermissions, validate.get ]
  , controller._get);

router.post('/' 
  , [ auth.verifyPermissions, validate.post ]
  , controller._post);

router.put('/:id'
  , [ auth.verifyPermissions, validate.put ]
  , controller._put);

router.get('/:id'
  , [ auth.verifyPermissions, validate.getId ]
  , controller.get);

// Export default router 
export default router;
