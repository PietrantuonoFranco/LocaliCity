import express from "express"
import { UsuarioController } from "../controller/UsuarioController"

const router = express.Router();

router.get("/", UsuarioController.all);
router.get("/:id/solicitudes", UsuarioController.getSolicitudes);
router.get("/:id", UsuarioController.one);
router.post("/", UsuarioController.save);
router.delete("/:id", UsuarioController.remove);
router.put("/:id", UsuarioController.update);

export default router;