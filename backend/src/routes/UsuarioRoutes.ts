import express from "express"
import { UsuarioController } from "../controller/UsuarioController"

const router = express.Router();

router.get("/", UsuarioController.all);
router.get("/:id", UsuarioController.one);
router.post("/", UsuarioController.save);
router.delete("/:id", UsuarioController.remove);

export default router;