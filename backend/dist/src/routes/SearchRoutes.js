"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SearchController_1 = require("../controller/SearchController");
const router = express_1.default.Router();
router.get("/all/:palabra", SearchController_1.SearchController.all);
router.get("/paises/:palabra", SearchController_1.SearchController.paises);
router.get("/provincias/:palabra", SearchController_1.SearchController.provincias);
router.get("/localidades/:palabra", SearchController_1.SearchController.localidades);
router.get("/usuarios/:palabra", SearchController_1.SearchController.usuarios);
router.get("/solicitudes/:palabra", SearchController_1.SearchController.solicitudes);
router.get("/solicitudes/usuario/:id/:palabra", SearchController_1.SearchController.usuarioSolicitudes);
exports.default = router;
