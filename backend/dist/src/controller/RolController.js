"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RolController = void 0;
const data_source_js_1 = require("../data-source.js");
const Rol_1 = require("../entity/Rol");
const rolRepository = data_source_js_1.AppDataSource.getRepository(Rol_1.Rol);
class RolController {
    static all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const roles = yield rolRepository.find();
                if (roles.length === 0) {
                    return response.status(404).json({ error: "Roles no encontrados." });
                }
                return response.status(200).json({ mensaje: "Roles encontrados.", roles: roles });
            }
            catch (error) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static one(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de Rol." });
                }
                const rol = yield rolRepository.findOne({
                    where: { id }
                });
                if (!rol) {
                    return response.status(404).json({ error: "Rol no encontrado." });
                }
                return response.status(200).json({ mensaje: "Rol encontrado.", rol: rol });
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ error: "Se ha producido un error interno del servidor. " });
            }
        });
    }
    static save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre } = request.body;
                if (!nombre) {
                    return response.status(400).json({ error: "Complete todos los campos necesarios." });
                }
                const rol = Object.assign(new Rol_1.Rol(), { nombre });
                yield rolRepository.save(rol);
                return response.status(201).json({ mensaje: "Rol creado correctamente.", rol: rol });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de Rol." });
                }
                let rolPorRemover = yield rolRepository.findOneBy({ id });
                if (!rolPorRemover) {
                    return response.status(404).json({ error: "Rol no encontrado." });
                }
                yield rolRepository.remove(rolPorRemover);
                return response.status(204).json({ mensaje: "Rol eliminado correctamente." });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
}
exports.RolController = RolController;
