import { Router } from "express";
import * as auth from "../middlewares/auth/authjwt";
import * as ctrl from "../controllers/action.controller";
import * as validator from "../middlewares/validation/action.validation";

const router = Router();

router.get("/action", [auth.verifyAccess], ctrl._get);

router.get("/action/:action", [auth.verifyAccess, validator.get], ctrl._get);

export default router;
