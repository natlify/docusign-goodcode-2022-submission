import { Router } from "express";
const router = Router();
import { isLoggedIn, login, logout } from "../controllers/docusignJWTAuth.js";

router.get("/isLoggedIn", isLoggedIn);
router.get("/login", login);
router.get("/logout", logout);

export { router as docuSignAuthRouter };
