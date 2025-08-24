"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PaisController_1 = require("../controller/PaisController");
const router = express_1.default.Router();
router.get("/", PaisController_1.PaisController.all);
router.get("/:id", PaisController_1.PaisController.one);
router.get("/:id/tiene-provincias", PaisController_1.PaisController.checkProvinciasById);
router.get("/:id/provincias", PaisController_1.PaisController.provinciasById);
router.post("/", PaisController_1.PaisController.save);
router.delete("/:id", PaisController_1.PaisController.remove);
router.put("/:id", PaisController_1.PaisController.update);
exports.default = router;
