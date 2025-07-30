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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entity/Usuario");
require("dotenv");
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.cookies.authToken;
        if (!token) {
            return res.status(401).json({ message: 'No autenticado - No hay token' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
        const usuario = yield usuarioRepository.findOne({
            where: { id: decoded.id },
            relations: ['rol']
        });
        console.log(usuario);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        req.user = usuario;
        next();
    }
    catch (error) {
        console.error('Error en autenticación:', error);
        return res.status(401).json({ message: 'No autenticado - Token inválido' });
    }
});
exports.authMiddleware = authMiddleware;
