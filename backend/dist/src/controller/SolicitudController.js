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
exports.SolicitudController = void 0;
const data_source_js_1 = require("../data-source.js");
const Solicitud_1 = require("../entity/Solicitud");
const Usuario_js_1 = require("../entity/Usuario.js");
const usuarioRepository = data_source_js_1.AppDataSource.getRepository(Usuario_js_1.Usuario);
const solicitudRepository = data_source_js_1.AppDataSource.getRepository(Solicitud_1.Solicitud);
class SolicitudController {
    static all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const solicitudes = yield solicitudRepository.find();
                if (solicitudes.length === 0) {
                    return response.status(404).json({ error: "Solicitudes no encontradas." });
                }
                return response.status(200).json({ mensaje: "Solicitudes encontradas.", solicitudes: solicitudes });
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
                    return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud." });
                }
                const solicitud = yield solicitudRepository.findOne({
                    where: { id }
                });
                if (!solicitud) {
                    return response.status(404).json({ error: "Solicitud no encontrada." });
                }
                return response.status(200).json({ mensaje: "Solicitud encontrada.", solicitud: solicitud });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { tipo, mensaje, referencia, pais, nombre, provincia, usuario } = request.body;
                if (!nombre || !usuario || !tipo || !referencia || !mensaje || (tipo === "provincia" && !pais) || (tipo === "localidad" && !provincia && !pais)) {
                    return response.status(400).json({ error: "Complete todos los campos necesarios." });
                }
                const user = yield usuarioRepository.findOne({ where: { id: usuario.id } });
                if (!user)
                    return response.status(404).json({ error: "No se reconoce al usuario enviado." });
                const solicitud = Object.assign(new Solicitud_1.Solicitud(), { tipo, mensaje, referencia, pais, nombre, provincia, user });
                yield solicitudRepository.save(solicitud);
                return response.status(201).json({ mensaje: "Solicitud creada correctamente.", solicitud: solicitud });
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud." });
                }
                let solicitudPorRemover = yield solicitudRepository.findOneBy({ id });
                if (!solicitudPorRemover) {
                    return response.status(404).json({ error: "Solicitud no encontrada." });
                }
                yield solicitudRepository.remove(solicitudPorRemover);
                return response.status(204).json({ mensaje: "Solicitud eliminada correctamente." });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
}
exports.SolicitudController = SolicitudController;
