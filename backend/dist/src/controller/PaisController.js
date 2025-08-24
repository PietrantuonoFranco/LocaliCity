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
exports.PaisController = void 0;
const data_source_js_1 = require("../data-source.js");
const Pais_1 = require("../entity/Pais");
const Provincia_js_1 = require("../entity/Provincia.js");
const paisRepository = data_source_js_1.AppDataSource.getRepository(Pais_1.Pais);
const provinciaRepository = data_source_js_1.AppDataSource.getRepository(Provincia_js_1.Provincia);
class PaisController {
    static all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paises = yield paisRepository.find();
                if (paises.length === 0) {
                    return response.status(404).json({ error: "Paises no encontrados." });
                }
                return response.status(200).json({ mensaje: "Paises encontrados.", paises: paises });
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
                    return response.status(400).json({ error: "No se ha proporcionado un ID de pais." });
                }
                const pais = yield paisRepository.findOne({
                    where: { id }
                });
                if (!pais) {
                    return response.status(404).json({ error: "Pais no encontrado." });
                }
                return response.status(200).json({ mensaje: "Pais encontrado.", pais: pais });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static provinciasById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id)
                    return response.status(400).json({ error: "Debe proporcionar un ID de pais." });
                const provincias = yield provinciaRepository.find({
                    where: { pais: { id } }
                });
                if (provincias.length === 0)
                    return response.status(404).json({ error: "Provincias no encontrados." });
                return response.status(200).json({ mensaje: "Provincias encontradas.", provincias: provincias });
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
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
                const pais = Object.assign(new Pais_1.Pais(), { nombre });
                yield paisRepository.save(pais);
                return response.status(201).json({ mensaje: "Pais creado correctamente.", pais: pais });
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
                    return response.status(400).json({ error: "No se ha proporcionado un ID de pais." });
                }
                let paisPorRemover = yield paisRepository.findOneBy({ id });
                if (!paisPorRemover) {
                    return response.status(404).json({ error: "Pais no encontrado." });
                }
                yield paisRepository.remove(paisPorRemover);
                return response.status(204).json({ mensaje: "Pais eliminado correctamente." });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id || id <= 0) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de país válido." });
                }
                const { nombre } = request.body;
                if (!nombre) {
                    return response.status(400).json({
                        error: "Debe proporcionar un nombre para actualizar."
                    });
                }
                const pais = yield paisRepository.findOneBy({ id });
                if (!pais) {
                    return response.status(404).json({ error: "País no encontrado." });
                }
                pais.nombre = nombre;
                yield paisRepository.save(pais);
                return response.status(200).json({
                    mensaje: "País actualizado correctamente.",
                    pais: pais
                });
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static checkProvinciasById(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id)
                    return response.status(400).json({ error: "Debe proporcionar un ID de pais." });
                const provincias = yield provinciaRepository.find({
                    where: { pais: { id } }
                });
                if (provincias.length === 0)
                    return response.status(200).json({ mensaje: "Provincias no encontradas.", hasProvincias: false });
                return response.status(200).json({ mensaje: "Provincias encontradas.", hasProvincias: true });
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
}
exports.PaisController = PaisController;
