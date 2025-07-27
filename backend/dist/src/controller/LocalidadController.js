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
exports.LocalidadController = void 0;
const data_source_js_1 = require("../data-source.js");
const Localidad_1 = require("../entity/Localidad");
const localidadRepository = data_source_js_1.AppDataSource.getRepository(Localidad_1.Localidad);
class LocalidadController {
    static all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const localidades = yield localidadRepository.find();
                if (localidades.length === 0) {
                    return response.status(404).json({ error: "Localidades no encontradas." });
                }
                return response.status(200).json({ mensaje: "Localidades encontradas.", localidades: localidades });
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
                    return response.status(400).json({ error: "No se ha proporcionado un ID de Localidad." });
                }
                const localidad = yield localidadRepository.findOne({
                    where: { id }
                });
                if (!localidad) {
                    return response.status(404).json({ error: "Localidad no encontrada." });
                }
                return response.status(200).json({ mensaje: "Localidad encontrada.", localidad: localidad });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, provincia } = request.body;
                if (!nombre || !provincia) {
                    return response.status(400).json({ error: "Complete todos los campos necesarios." });
                }
                const localidad = Object.assign(new Localidad_1.Localidad(), { nombre, provincia });
                yield localidadRepository.save(localidad);
                return response.status(201).json({ mensaje: "Localidad creada correctamente.", localidad: localidad });
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
                    return response.status(400).json({ error: "No se ha proporcionado un ID de Localidad." });
                }
                let localidadPorRemover = yield localidadRepository.findOneBy({ id });
                if (!localidadPorRemover) {
                    return response.status(404).json({ error: "Localidad no encontrada." });
                }
                yield localidadRepository.remove(localidadPorRemover);
                return response.status(204).json({ mensaje: "Localidad eliminada correctamente." });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
}
exports.LocalidadController = LocalidadController;
