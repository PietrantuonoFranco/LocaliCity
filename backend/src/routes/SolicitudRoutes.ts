import express from "express"
import { SolicitudController } from "../controller/SolicitudController"

const router = express.Router();

router.get("/", SolicitudController.all);
router.get("/:id", SolicitudController.one);
router.post("/", SolicitudController.save);
router.delete("/:id", SolicitudController.remove);

export default router;