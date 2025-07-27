"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SolicitudController_1 = require("../controller/SolicitudController");
const router = express_1.default.Router();
router.get("/", SolicitudController_1.SolicitudController.all);
router.get("/:id", SolicitudController_1.SolicitudController.one);
router.post("/", SolicitudController_1.SolicitudController.save);
router.delete("/:id", SolicitudController_1.SolicitudController.remove);
exports.default = router;
