import express from "express"
import { PaisController } from "../controller/PaisController"

const router = express.Router();

router.get("/", PaisController.all);
router.get("/:id", PaisController.one);
router.post("/", PaisController.save);
router.delete("/:id", PaisController.remove);

export default router;