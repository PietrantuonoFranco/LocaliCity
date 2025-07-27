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
exports.ProvinciaController = void 0;
const data_source_js_1 = require("../data-source.js");
const Provincia_js_1 = require("../entity/Provincia.js");
const provinciaRepository = data_source_js_1.AppDataSource.getRepository(Provincia_js_1.Provincia);
class ProvinciaController {
    static all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const provincias = yield provinciaRepository.find();
                if (provincias.length === 0) {
                    return response.status(404).json({ error: "Provincias no encontradas." });
                }
                return response.status(200).json({ mensaje: "Provincias encontradas.", provincias: provincias });
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
                    return response.status(400).json({ error: "No se ha proporcionado un ID de provincia." });
                }
                const provincia = yield provinciaRepository.findOne({
                    where: { id }
                });
                if (!provincia) {
                    return response.status(404).json({ error: "provincia no encontrada." });
                }
                return response.status(200).json({ mensaje: "Provincia encontrada.", provincia: provincia });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre, pais } = request.body;
                if (!nombre || !pais) {
                    return response.status(400).json({ error: "Complete todos los campos necesarios." });
                }
                const provincia = Object.assign(new Provincia_js_1.Provincia(), { nombre, pais });
                yield provinciaRepository.save(provincia);
                return response.status(201).json({ mensaje: "Provincia creada correctamente.", provincia: provincia });
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
                    return response.status(400).json({ error: "No se ha proporcionado un ID de provincia." });
                }
                let provinciaPorRemover = yield provinciaRepository.findOneBy({ id });
                if (!provinciaPorRemover) {
                    return response.status(404).json({ error: "Provincia no encontrada." });
                }
                yield provinciaRepository.remove(provinciaPorRemover);
                return response.status(204).json({ mensaje: "Provincia eliminada correctamente." });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
}
exports.ProvinciaController = ProvinciaController;
