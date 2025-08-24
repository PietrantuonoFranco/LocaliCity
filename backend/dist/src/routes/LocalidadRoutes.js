"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LocalidadController_1 = require("../controller/LocalidadController");
const router = express_1.default.Router();
router.get("/", LocalidadController_1.LocalidadController.all);
router.get("/:id", LocalidadController_1.LocalidadController.one);
router.post("/", LocalidadController_1.LocalidadController.save);
router.delete("/:id", LocalidadController_1.LocalidadController.remove);
router.put("/:id", LocalidadController_1.LocalidadController.update);
exports.default = router;
