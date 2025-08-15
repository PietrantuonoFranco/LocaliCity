import express from "express"
import { SearchController } from "../controller/SearchController"

const router = express.Router();

router.get("/all/:palabra", SearchController.all);
router.get("/paises/:palabra", SearchController.paises);
router.get("/provincias/:palabra", SearchController.provincias);
router.get("/localidades/:palabra", SearchController.localidades);
router.get("/usuarios/:palabra", SearchController.usuarios);
router.get("/solicitudes/:palabra", SearchController.solicitudes);
router.get("/solicitudes/usuario/:id/:palabra", SearchController.usuarioSolicitudes);

export default router;