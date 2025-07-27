"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const RolController_1 = require("../controller/RolController");
const router = express_1.default.Router();
router.get("/", RolController_1.RolController.all);
router.get("/:id", RolController_1.RolController.one);
router.post("/", RolController_1.RolController.save);
router.delete("/:id", RolController_1.RolController.remove);
exports.default = router;
