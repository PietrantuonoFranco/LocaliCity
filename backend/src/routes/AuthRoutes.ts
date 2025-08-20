import { Router } from "express";
import { AuthController } from "../controller/AuthController";
import { authMiddleware } from "../middleware/AuthMiddleware";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", AuthController.logout);
router.get("/profile", authMiddleware, AuthController.profile);
router.get("/is-authenticated", AuthController.checkAuth);
router.put("/", authMiddleware, AuthController.update);

export default router;