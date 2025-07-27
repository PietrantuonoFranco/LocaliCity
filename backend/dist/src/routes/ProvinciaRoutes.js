"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProvinciaController_1 = require("../controller/ProvinciaController");
const router = express_1.default.Router();
router.get("/", ProvinciaController_1.ProvinciaController.all);
router.get("/:id", ProvinciaController_1.ProvinciaController.one);
router.post("/", ProvinciaController_1.ProvinciaController.save);
router.delete("/:id", ProvinciaController_1.ProvinciaController.remove);
exports.default = router;
