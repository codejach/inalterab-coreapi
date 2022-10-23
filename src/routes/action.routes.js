import { Router } from "express";
import * as auth from "../middlewares/auth/authjwt";
import * as ctrl from "../controllers/action.controller";

const router = Router();

router.get("/action", [auth.verifyAccess], ctrl._get);

export default router;
