import { Router } from "express";
import * as auth from "../middlewares/auth/authjwt";
import * as ctrl from "../controllers/access.controller";

const router = Router();

router.get("/access", [auth.verifyAccess], ctrl._get);

export default router;
