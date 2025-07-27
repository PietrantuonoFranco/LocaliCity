import express from "express"
import { RolController } from "../controller/RolController"

const router = express.Router();

router.get("/", RolController.all);
router.get("/:id", RolController.one);
router.post("/", RolController.save);
router.delete("/:id", RolController.remove);

export default router;