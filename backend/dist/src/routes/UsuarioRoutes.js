"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsuarioController_1 = require("../controller/UsuarioController");
const router = express_1.default.Router();
router.get("/", UsuarioController_1.UsuarioController.all);
router.get("/:id/solicitudes", UsuarioController_1.UsuarioController.getSolicitudes);
router.get("/:id", UsuarioController_1.UsuarioController.one);
router.post("/", UsuarioController_1.UsuarioController.save);
router.delete("/:id", UsuarioController_1.UsuarioController.remove);
exports.default = router;
