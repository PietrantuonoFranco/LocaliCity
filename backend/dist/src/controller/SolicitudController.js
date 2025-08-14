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
const Usuario_1 = require("../entity/Usuario");
const Localidad_1 = require("../entity/Localidad");
const Pais_1 = require("../entity/Pais");
const Provincia_1 = require("../entity/Provincia");
const usuarioRepository = data_source_js_1.AppDataSource.getRepository(Usuario_1.Usuario);
const localidadRepository = data_source_js_1.AppDataSource.getRepository(Localidad_1.Localidad);
const paisRepository = data_source_js_1.AppDataSource.getRepository(Pais_1.Pais);
const provinciaRepository = data_source_js_1.AppDataSource.getRepository(Provincia_1.Provincia);
const solicitudRepository = data_source_js_1.AppDataSource.getRepository(Solicitud_1.Solicitud);
class SolicitudController {
    static all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const solicitudes = yield solicitudRepository.find({ relations: ['usuario', 'pais', 'provincia', 'localidad'] });
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
                const solicitud = new Solicitud_1.Solicitud();
                solicitud.tipo = tipo;
                solicitud.mensaje = mensaje;
                solicitud.referencia = referencia;
                solicitud.nombre = nombre;
                solicitud.usuario = user;
                if (tipo === "pais") {
                    solicitud.provincia = provincia;
                    solicitud.pais = pais;
                }
                else if (tipo === "provincia") {
                    const auxPais = yield paisRepository.findOne({ where: { id: pais.id } });
                    if (!auxPais)
                        return response.status(404).json({ error: "No se reconoce al pais enviado." });
                    solicitud.pais = auxPais;
                    solicitud.provincia = provincia;
                }
                else if (tipo === "localidad") {
                    const auxPais = yield paisRepository.findOne({ where: { id: pais.id } });
                    if (!auxPais)
                        return response.status(404).json({ error: "No se reconoce al pais enviado." });
                    const auxProvincia = yield provinciaRepository.findOne({ where: { id: provincia.id } });
                    if (!auxProvincia)
                        return response.status(404).json({ error: "No se reconoce al provincia enviado." });
                    solicitud.pais = auxPais;
                    solicitud.provincia = auxProvincia;
                }
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
    static update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id || id <= 0) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud válido." });
                }
                const { tipo, mensaje, referencia, pais, nombre, provincia, estado, usuario } = request.body;
                if (!tipo && !mensaje && !referencia && !pais && !nombre && !provincia && !estado && !usuario) {
                    return response.status(400).json({
                        error: "Debe proporcionar al menos un campo para actualizar."
                    });
                }
                if (tipo === "provincia" && !pais) {
                    return response.status(400).json({
                        error: "Para tipo 'provincia' debe especificar el país."
                    });
                }
                if (tipo === "localidad" && (!provincia || !pais)) {
                    return response.status(400).json({
                        error: "Para tipo 'localidad' debe especificar provincia y país."
                    });
                }
                const solicitud = yield solicitudRepository.findOneBy({ id });
                if (!solicitud) {
                    return response.status(404).json({ error: "Solicitud no encontrada." });
                }
                if (tipo !== null)
                    solicitud.tipo = tipo;
                if (mensaje !== null)
                    solicitud.mensaje = mensaje;
                if (referencia !== null)
                    solicitud.referencia = referencia;
                if (pais !== null)
                    solicitud.pais = pais;
                if (nombre !== null)
                    solicitud.nombre = nombre;
                if (provincia !== null)
                    solicitud.provincia = provincia;
                if (estado !== null)
                    solicitud.estado = estado;
                if (usuario !== null)
                    solicitud.usuario = usuario;
                yield solicitudRepository.save(solicitud);
                return response.status(200).json({
                    mensaje: "Solicitud actualizada correctamente.",
                    data: solicitud
                });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static aceptarSolicitud(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id || id <= 0) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de solicitud válido." });
                }
                const solicitud = yield solicitudRepository.findOne({
                    where: { id },
                    relations: ['usuario', 'pais', 'provincia', 'localidad']
                });
                if (!solicitud) {
                    return response.status(404).json({ error: "Solicitud no encontrada." });
                }
                if (solicitud.tipo === "pais") {
                    const pais = Object.assign(new Pais_1.Pais(), { nombre: solicitud.nombre });
                    yield paisRepository.save(pais);
                    solicitud.pais = pais;
                }
                else if (solicitud.tipo === "provincia") {
                    const pais = yield paisRepository.findOne({ where: { id: solicitud.pais.id } });
                    const provincia = Object.assign(new Provincia_1.Provincia(), { nombre: solicitud.nombre, pais });
                    yield provinciaRepository.save(provincia);
                    solicitud.provincia = provincia;
                }
                else if (solicitud.tipo === "localidad") {
                    const provincia = yield provinciaRepository.findOne({ where: { id: solicitud.provincia.id } });
                    const localidad = Object.assign(new Localidad_1.Localidad(), { nombre: solicitud.nombre, provincia });
                    yield localidadRepository.save(localidad);
                    solicitud.localidad = localidad;
                }
                solicitud.estado = "Aceptada";
                yield solicitudRepository.save(solicitud);
                return response.status(200).json({
                    mensaje: "Solicitud actualizada correctamente.",
                    data: solicitud
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
}
exports.SolicitudController = SolicitudController;
