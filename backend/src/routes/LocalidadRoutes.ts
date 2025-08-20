import express from "express"
import { LocalidadController } from "../controller/LocalidadController"

const router = express.Router();

router.get("/", LocalidadController.all);
router.get("/:id", LocalidadController.one);
router.post("/", LocalidadController.save);
router.delete("/:id", LocalidadController.remove);
router.put("/:id", LocalidadController.update);

export default router;