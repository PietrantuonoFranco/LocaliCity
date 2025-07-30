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
const Rol_1 = require("../entity/Rol");
const usuarioRepository = data_source_1.AppDataSource.getRepository(Usuario_1.Usuario);
const rolRepository = data_source_1.AppDataSource.getRepository(Rol_1.Rol);
const jwtSecret = process.env.JWT_SECRET || "your-secret-key";
class AuthController {
    static register(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, contrasenia, nombre, apellido } = request.body;
                if (!email || !contrasenia || !nombre || !apellido) {
                    return response.status(400).json({
                        mensaje: "Todos los campos son requeridos: email, contraseña, nombre y apellido"
                    });
                }
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    return response.status(400).json({
                        mensaje: "El formato del email no es válido"
                    });
                }
                if (contrasenia.length < 8) {
                    return response.status(400).json({
                        mensaje: "La contraseña debe tener al menos 8 caracteres"
                    });
                }
                let usuario = yield usuarioRepository.findOne({ where: { email } });
                if (usuario) {
                    return response.status(400).json({ mensaje: "Ya existe un usuario con ese nombre." });
                }
                let rol = yield rolRepository.findOne({ where: { nombre: "Regular" } });
                if (!rol) {
                    rol = new Rol_1.Rol();
                    rol.nombre = "Administrador";
                    yield rolRepository.save(rol);
                    // return response.status(400).json({ mensaje: "Rol inexistente" });
                }
                usuario = new Usuario_1.Usuario();
                usuario.email = email;
                usuario.contrasenia = contrasenia;
                usuario.nombre = nombre;
                usuario.apellido = apellido;
                usuario.rol = rol;
                yield usuario.hashContrasenia();
                yield usuarioRepository.save(usuario);
                const token = jsonwebtoken_1.default.sign({
                    id: usuario.id,
                    email: usuario.email,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    contrasenia: usuario.contrasenia,
                    rol: usuario.rol
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
                        apellido: usuario.apellido,
                        rol: usuario.rol
                    }
                });
            }
            catch (error) {
                console.log(error);
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
                    apellido: usuario.apellido,
                    contrasenia: usuario.contrasenia,
                    rol: usuario.rol
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
                        apellido: usuario.apellido,
                        rol: usuario.rol
                    }
                });
            }
            catch (error) {
                console.error("Login error:", error);
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
            return res.status(200).json({ message: "Sesión cerrada exitosamente." });
        });
    }
    static profile(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const usuario = request.user;
                return response.json({ usuario: usuario });
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ message: "Internal server error" });
            }
        });
    }
}
exports.AuthController = AuthController;
