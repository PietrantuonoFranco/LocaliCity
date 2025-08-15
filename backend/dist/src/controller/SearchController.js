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
exports.SearchController = void 0;
const data_source_1 = require("../data-source");
const typeorm_1 = require("typeorm");
// Entities
const Localidad_1 = require("../entity/Localidad");
const Pais_1 = require("../entity/Pais");
const Provincia_1 = require("../entity/Provincia");
const Solicitud_1 = require("../entity/Solicitud");
const Usuario_1 = require("../entity/Usuario");
// Repositories
const localidadRepository = data_source_1.AppDataSource.getRepository(Localidad_1.Localidad);
const paisRepository = data_source_1.AppDataSource.getRepository(Pais_1.Pais);
const provinciaRepository = data_source_1.AppDataSource.getRepository(Provincia_1.Provincia);
const solicitudRepository = data_source_1.AppDataSource.getRepository(Solicitud_1.Solicitud);
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
class SearchController {
    static all(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palabra = request.params.palabra;
                if (!palabra) {
                    return response.status(400).json({ error: "No se ha proporcionado una palabra." });
                }
                // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
                const searchPattern = `%${palabra}%`;
                // Búsqueda en países
                const paises = yield paisRepository.find({
                    where: {
                        nombre: (0, typeorm_1.ILike)(searchPattern)
                    }
                });
                // Búsqueda en provincias (con relación a país)
                const provincias = yield provinciaRepository.find({
                    where: {
                        nombre: (0, typeorm_1.ILike)(searchPattern)
                    },
                    relations: ['pais']
                });
                // Búsqueda en localidades (con relación a provincia y país)
                const localidades = yield localidadRepository.find({
                    where: {
                        nombre: (0, typeorm_1.ILike)(searchPattern)
                    },
                    relations: ['provincia', 'provincia.pais']
                });
                if (paises.length === 0 && provincias.length === 0 && localidades.length === 0) {
                    return response.status(404).json({ error: "No se encontraron resultados." });
                }
                return response.status(200).json({
                    mensaje: "Datos encontrados.",
                    paises,
                    provincias,
                    localidades
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    error: "Error interno del servidor",
                    detalle: error
                });
            }
        });
    }
    static paises(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palabra = request.params.palabra;
                if (!palabra) {
                    return response.status(400).json({ error: "No se ha proporcionado una palabra." });
                }
                // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
                const searchPattern = `%${palabra}%`;
                // Búsqueda en países
                const paises = yield paisRepository.find({
                    where: {
                        nombre: (0, typeorm_1.ILike)(searchPattern)
                    }
                });
                if (paises.length === 0) {
                    return response.status(404).json({ error: "No se encontraron resultados." });
                }
                return response.status(200).json({
                    mensaje: "Datos encontrados.",
                    paises
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    error: "Error interno del servidor",
                    detalle: error
                });
            }
        });
    }
    static provincias(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palabra = request.params.palabra;
                if (!palabra) {
                    return response.status(400).json({ error: "No se ha proporcionado una palabra." });
                }
                // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
                const searchPattern = `%${palabra}%`;
                // Búsqueda en provincias (con relación a país)
                const provincias = yield provinciaRepository.find({
                    where: {
                        nombre: (0, typeorm_1.ILike)(searchPattern)
                    },
                    relations: ['pais']
                });
                if (provincias.length === 0) {
                    return response.status(404).json({ error: "No se encontraron resultados." });
                }
                return response.status(200).json({
                    mensaje: "Datos encontrados.",
                    provincias
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    error: "Error interno del servidor",
                    detalle: error
                });
            }
        });
    }
    static localidades(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palabra = request.params.palabra;
                if (!palabra) {
                    return response.status(400).json({ error: "No se ha proporcionado una palabra." });
                }
                // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
                const searchPattern = `%${palabra}%`;
                // Búsqueda en localidades (con relación a provincia y país)
                const localidades = yield localidadRepository.find({
                    where: {
                        nombre: (0, typeorm_1.ILike)(searchPattern)
                    },
                    relations: ['provincia', 'provincia.pais'] // Relaciones anidadas
                });
                if (localidades.length === 0) {
                    return response.status(404).json({ error: "No se encontraron resultados." });
                }
                return response.status(200).json({
                    mensaje: "Datos encontrados.",
                    localidades
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    error: "Error interno del servidor",
                    detalle: error
                });
            }
        });
    }
    static usuarios(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palabra = request.params.palabra;
                if (!palabra) {
                    return response.status(400).json({ error: "No se ha proporcionado una palabra." });
                }
                // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
                const searchPattern = `%${palabra}%`;
                const usuarios = yield usuarioRepository.find({
                    where: [
                        { email: (0, typeorm_1.ILike)(searchPattern) },
                        { nombre: (0, typeorm_1.ILike)(searchPattern) },
                        { apellido: (0, typeorm_1.ILike)(searchPattern) }
                    ],
                    relations: ['rol']
                });
                if (usuarios.length === 0) {
                    return response.status(404).json({ error: "No se encontraron resultados." });
                }
                return response.status(200).json({
                    mensaje: "Datos encontrados.",
                    usuarios
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    error: "Error interno del servidor",
                    detalle: error
                });
            }
        });
    }
    static solicitudes(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const palabra = request.params.palabra;
                if (!palabra) {
                    return response.status(400).json({ error: "No se ha proporcionado una palabra." });
                }
                // Usamos ILike para búsqueda insensible a mayúsculas/minúsculas
                const searchPattern = `%${palabra}%`;
                const solicitudes = yield solicitudRepository
                    .createQueryBuilder('solicitud')
                    .leftJoinAndSelect('solicitud.usuario', 'usuario')
                    .leftJoinAndSelect('solicitud.pais', 'pais')
                    .leftJoinAndSelect('solicitud.provincia', 'provincia')
                    .leftJoinAndSelect('solicitud.localidad', 'localidad')
                    .where('solicitud.nombre ILike :search', { search: searchPattern })
                    .orWhere('usuario.email ILike :search', { search: searchPattern })
                    .orWhere('usuario.nombre ILike :search', { search: searchPattern })
                    .orWhere('usuario.apellido ILike :search', { search: searchPattern })
                    .orWhere('pais.nombre ILike :search', { search: searchPattern })
                    .orWhere('provincia.nombre ILike :search', { search: searchPattern })
                    .orWhere('localidad.nombre ILike :search', { search: searchPattern })
                    .getMany();
                if (solicitudes.length === 0) {
                    return response.status(404).json({ error: "No se encontraron resultados." });
                }
                return response.status(200).json({
                    mensaje: "Datos encontrados.",
                    solicitudes
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    error: "Error interno del servidor",
                    detalle: error
                });
            }
        });
    }
    static usuarioSolicitudes(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = parseInt(request.params.id);
                const palabra = request.params.palabra;
                if (!id) {
                    return response.status(400).json({ error: "No se ha proporcionado un ID de Usuario." });
                }
                if (!palabra) {
                    return response.status(400).json({ error: "No se ha proporcionado una palabra." });
                }
                const usuario = yield usuarioRepository.findOneBy({ id });
                if (!usuario)
                    return response.status(404).json({ error: "Usuario no encontrado." });
                const searchPattern = `%${palabra}%`;
                const solicitudes = yield solicitudRepository
                    .createQueryBuilder('solicitud')
                    .leftJoinAndSelect('solicitud.usuario', 'usuario')
                    .leftJoinAndSelect('solicitud.pais', 'pais')
                    .leftJoinAndSelect('solicitud.provincia', 'provincia')
                    .leftJoinAndSelect('solicitud.localidad', 'localidad')
                    .where('usuario.id = :usuarioId', { usuarioId: id })
                    .andWhere(new typeorm_1.Brackets(qb => {
                    qb.where('solicitud.nombre ILike :search', { search: searchPattern })
                        .orWhere('pais.nombre ILike :search', { search: searchPattern })
                        .orWhere('provincia.nombre ILike :search', { search: searchPattern })
                        .orWhere('localidad.nombre ILike :search', { search: searchPattern });
                }))
                    .getMany();
                if (solicitudes.length === 0) {
                    return response.status(404).json({
                        error: "No se encontraron solicitudes para este usuario con los criterios de búsqueda."
                    });
                }
                return response.status(200).json({
                    mensaje: "Solicitudes encontradas.",
                    solicitudes
                });
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({
                    error: "Error interno del servidor",
                    detalle: error
                });
            }
        });
    }
}
exports.SearchController = SearchController;
