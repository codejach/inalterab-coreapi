import { Router } from 'express';
import * as ctrl from '../controllers/auth.controller';
import * as validator from '../middlewares/validation/auth.validation';

// Initialize
const router = Router();

// Implementations
router.post('/signin', validator.signin, ctrl.signin);

router.post('/signin/eth', validator.signinEth, ctrl.signinEth);

router.post('/signup', validator.signup, ctrl.signup);

router.post('/signup/eth', validator.signupEth, ctrl.signupEth);

export default router;
