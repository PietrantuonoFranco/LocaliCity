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
exports.AuthController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const data_source_1 = require("../data-source");
const Usuario_1 = require("../entity/Usuario");
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
class AuthController {
    static register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, contrasenia, nombre, apellido } = request.body;
                let usuario = yield usuarioRepository.findOne({ where: { email } });
                if (usuario) {
                    return response.status(400).json({ message: "usuario already exists" });
                }
                usuario = new Usuario_1.Usuario();
                usuario.email = email;
                usuario.contrasenia = contrasenia;
                usuario.nombre = nombre;
                usuario.apellido = apellido;
                yield usuario.hashContrasenia();
                yield usuarioRepository.save(usuario);
                const token = jsonwebtoken_1.default.sign({
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido
                }, jwtSecret, {
                    expiresIn: "1h",
                });
                return response
                    .status(201)
                    .cookie("authToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 3600000,
                })
                    .json({
                    usuario: {
                        email: usuario.email,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido
                    }
                });
            }
            catch (error) {
                return response.status(500).json({ message: "Internal server error" });
            }
        });
    }
    static login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, contrasenia } = request.body;
                if (!email || !contrasenia) {
                    return response.status(400).json({
                        message: "Debe ingresar el email y la contraseña."
                    });
                }
                const usuario = yield usuarioRepository.findOne({ where: { email } });
                if (!usuario) {
                    return response.status(404).json({ message: "Usuario no encontrado." });
                }
                const isValid = yield usuario.compareContrasenia(contrasenia);
                if (!isValid) {
                    return response.status(401).json({ message: "Credenciales inválidas" });
                }
                const token = jsonwebtoken_1.default.sign({
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido
                }, jwtSecret, {
                    expiresIn: "1h",
                });
                return response
                    .status(200)
                    .cookie("authToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    sameSite: "strict",
                    maxAge: 3600000,
                })
                    .json({
                    usuario: {
                        email: usuario.email,
                        nombre: usuario.nombre,
                        apellido: usuario.apellido
                    }
                });
            }
            catch (error) {
                console.error("Login error:", error); // Log detallado
                return response.status(500).json({
                    message: "Internal server error",
                    error: error
                });
            }
        });
    }
    static logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("authToken");
            return res.status(200).json({ message: "Logged out successfully" });
        });
    }
    static profile(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = request.body.usuario;
                return response.json({ usuario: usuario });
            }
            catch (error) {
                return response.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.AuthController = AuthController;
