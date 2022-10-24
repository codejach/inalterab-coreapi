import { Router } from "express";
import * as auth from "../middlewares/auth/authjwt";
import * as ctrl from "../controllers/permission.controller";
import * as validator from "../middlewares/validation/permission.validation";

const router = Router();

router.get("/permission", [auth.verifyAccess], ctrl._get);

router.get("/permission/:role", [auth.verifyAccess, validator.get], ctrl._get);

export default router;
