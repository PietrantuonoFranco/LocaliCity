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
exports.default = rolSeed;
const data_source_1 = require("../data-source");
const Rol_1 = require("../entity/Rol");
const rolRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
function rolSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        if ((yield rolRepository.find()).length > 0)
            return null;
        yield createRol("Regular");
        yield createRol("Administrador");
        console.log("Seed de roles completado exitosamente");
    });
}
const createRol = (nombre) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!nombre)
            throw Error("Debe ingresar un nombre para crear el rol");
        const rol = Object.assign(new Rol_1.Rol(), { nombre });
        yield rolRepository.save(rol);
        console.log(`Rol ${nombre} creado exitosamente`);
    }
    catch (error) {
        console.error(`Error creando el rol ${nombre}:`, error);
        throw error;
    }
});
