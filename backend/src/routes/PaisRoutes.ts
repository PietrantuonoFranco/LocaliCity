import express from "express"
import { PaisController } from "../controller/PaisController"

const router = express.Router();

router.get("/", PaisController.all);
router.get("/:id", PaisController.one);
router.get("/:id/tiene-provincias", PaisController.checkProvinciasById);
router.get("/:id/provincias", PaisController.provinciasById);
router.post("/", PaisController.save);
router.delete("/:id", PaisController.remove);
router.put("/:id", PaisController.update);

export default router;