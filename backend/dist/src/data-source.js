"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
// Entidades
const Rol_1 = require("./entity/Rol");
const Usuario_1 = require("./entity/Usuario");
const Pais_1 = require("./entity/Pais");
const Provincia_1 = require("./entity/Provincia");
const Localidad_1 = require("./entity/Localidad");
const Solicitud_1 = require("./entity/Solicitud");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: false,
    entities: [Rol_1.Rol, Usuario_1.Usuario, Pais_1.Pais, Provincia_1.Provincia, Localidad_1.Localidad, Solicitud_1.Solicitud],
    migrations: [],
    subscribers: [],
});
exports.AppDataSource.initialize()
    .then(() => console.log("✅ Conexión a la base de datos establecida"))
    .catch((error) => console.log("❌ Error de conexión:", error));
