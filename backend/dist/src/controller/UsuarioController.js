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
exports.UsuarioController = void 0;
const data_source_js_1 = require("../data-source.js");
const Usuario_1 = require("../entity/Usuario");
const Solicitud_js_1 = require("../entity/Solicitud.js");
require("dotenv");
const solicitudRepository = data_source_js_1.AppDataSource.getRepository(Solicitud_js_1.Solicitud);
const usuarioRepository = data_source_js_1.AppDataSource.getRepository(Usuario_1.Usuario);
class UsuarioController {
    static all(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuarios = yield usuarioRepository.find({ relations: ['rol'] });
                if (usuarios.length === 0) {
                    return response.status(404).json({ error: "Usuarios no encontrados." });
                }
                return response.status(200).json({ mensaje: "Usuarios encontrados.", usuarios: usuarios });
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
                    return response.status(500).json({ error: "No se ha proporcionado un ID de Usuario." });
                }
                const usuario = yield usuarioRepository.findOne({
                    where: { id },
                    relations: ['rol']
                });
                if (!usuario) {
                    return response.status(404).json({ error: "Usuario no encontrado." });
                }
                return response.status(200).json({ mensaje: "Usuario encontrado.", usuario: usuario });
            }
            catch (_a) {
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static save(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, nombre, apellido, contrasenia, rol, } = request.body;
                if (!email || !nombre || !apellido || !contrasenia || !rol) {
                    return response.status(400).json({ error: "Complete todos los campos necesarios." });
                }
                let usuario = yield usuarioRepository.findOne({ where: { email } });
                if (usuario) {
                    return response.status(400).json({ mensaje: "Ya existe un Usuario con ese email." });
                }
                usuario = Object.assign(new Usuario_1.Usuario(), {
                    email,
                    nombre,
                    apellido,
                    contrasenia,
                    rol
                });
                yield usuario.hashContrasenia();
                yield usuarioRepository.save(usuario);
                return response.status(201).json({ mensaje: "Usuario creado correctamente.", usuario: usuario });
            }
            catch (error) {
                return response.status(500).json({ mensaje: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static remove(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de Usuario." });
                }
                let usuarioPorRemover = yield usuarioRepository.findOneBy({ id });
                if (!usuarioPorRemover) {
                    return response.status(404).json({ error: "Usuario no encontrado." });
                }
                yield usuarioRepository.remove(usuarioPorRemover);
                return response.status(204).json({ mensaje: "Usuario eliminado correctamente." });
            }
            catch (error) {
                return response.status(500).json({ mensaje: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static update(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id || id <= 0) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de usuario válido." });
                }
                const { email, nombre, apellido, contrasenia, rol } = request.body;
                if (!email && !nombre && !apellido && !contrasenia && !rol) {
                    return response.status(400).json({
                        error: "Debe proporcionar al menos un campo para actualizar."
                    });
                }
                const usuario = yield usuarioRepository.findOneBy({ id });
                if (!usuario) {
                    return response.status(404).json({ error: "Usuario no encontrado." });
                }
                if (email !== null)
                    usuario.email = email;
                if (nombre !== null)
                    usuario.nombre = nombre;
                if (apellido !== null)
                    usuario.apellido = apellido;
                if (rol !== null)
                    usuario.rol = rol;
                if (contrasenia !== null) {
                    usuario.contrasenia = contrasenia;
                    yield usuario.hashContrasenia();
                }
                yield usuarioRepository.save(usuario);
                return response.status(200).json({
                    mensaje: "Usuario actualizado correctamente.",
                    usuario: usuario
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ error: "Se ha producido un error interno del servidor." });
            }
        });
    }
    static getSolicitudes(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                if (!id) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de Usuario." });
                }
                const usuario = yield usuarioRepository.findOneBy({ id });
                if (!usuario)
                    return response.status(404).json({ error: "Usuario no encontrado." });
                const solicitudes = yield solicitudRepository.find({
                    where: { usuario: usuario },
                    relations: ['usuario', 'pais', 'provincia', 'localidad']
                });
                if (solicitudes.length === 0)
                    return response.status(404).json({ error: "El usuario dado no tiene ninguna solicitud." });
                solicitudes.map(s => console.log(s.pais));
                return response.status(200).json({ mensaje: "Solicitudes encontradas.", solicitudes: solicitudes });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ mensaje: "Se ha producido un error interno del servidor." });
            }
        });
    }
}
exports.UsuarioController = UsuarioController;
