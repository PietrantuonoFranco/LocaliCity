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
exports.default = usuarioSeed;
const data_source_1 = require("../data-source");
const Rol_1 = require("../entity/Rol");
const Usuario_1 = require("../entity/Usuario");
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
function usuarioSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield data_source_1.AppDataSource.manager.find(Usuario_1.Usuario)).length > 0)
            return null;
        const adminRol = yield getRolByName("Administrador");
        const regularRol = yield getRolByName("Regular");
        if (!adminRol || !regularRol)
            throw Error("No se han podido encontrar los roles.");
        yield createUsuario("admin@example.com", "Jhon", "Doe", "admin123", adminRol);
        yield createUsuario("normie@example.com", "Juan", "Pérez", "normie123", regularRol);
        console.log("Seed de usuarios completado exitosamente");
    });
}
const createUsuario = (email, nombre, apellido, contrasenia, rol) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!email || !nombre || !apellido || !contrasenia || !rol) {
            throw Error("Debe ingresar todos los datos");
        }
        const usuario = Object.assign(new Usuario_1.Usuario(), {
            email,
            nombre,
            apellido,
            contrasenia,
            rol
        });
        yield usuario.hashContrasenia();
        yield usuarioRepository.save(usuario);
        console.log(`Usuario ${email} creado exitosamente`);
    }
    catch (error) {
        console.error(`Error creando usuario ${email}:`, error);
        throw error;
    }
});
const getRolByName = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!nombre)
            throw Error("Debe proporcionar un nombre para buscar el rol.");
        const rol = yield data_source_1.AppDataSource.manager.findOne(Rol_1.Rol, { where: { nombre: nombre } });
        if (!rol)
            throw Error("No se ha encontrado el rol.");
        return rol;
    }
    catch (error) {
        {
            console.error(`Error buscando rol '${nombre}':`, error);
            return null;
        }
    }
});
