import express from "express"
import { ProvinciaController } from "../controller/ProvinciaController"

const router = express.Router();

router.get("/", ProvinciaController.all);
router.get("/:id", ProvinciaController.one);
router.post("/", ProvinciaController.save);
router.delete("/:id", ProvinciaController.remove);
router.put("/:id", ProvinciaController.update);

export default router;