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
const express_1 = __importDefault(require("express"));
const data_source_1 = require("./src/data-source");
require("reflect-metadata");
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Routes
const UsuarioRoutes_1 = __importDefault(require("./src/routes/UsuarioRoutes"));
const RolRoutes_1 = __importDefault(require("./src/routes/RolRoutes"));
const SolicitudRoutes_1 = __importDefault(require("./src/routes/SolicitudRoutes"));
const PaisRoutes_1 = __importDefault(require("./src/routes/PaisRoutes"));
const ProvinciaRoutes_1 = __importDefault(require("./src/routes/ProvinciaRoutes"));
const LocalidadRoutes_1 = __importDefault(require("./src/routes/LocalidadRoutes"));
const AuthRoutes_1 = __importDefault(require("./src/routes/AuthRoutes"));
const SearchRoutes_1 = __importDefault(require("./src/routes/SearchRoutes"));
data_source_1.AppDataSource.initialize().then(() => __awaiter(void 0, void 0, void 0, function* () {
    // Creación de la app con ExpressJS
    const app = (0, express_1.default)();
    // Definicion de origenes permitidos
    app.use((0, cors_1.default)({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use((0, cookie_parser_1.default)());
    app.use(express_1.default.json());
    // Definicion de las rutas
    app.use("/auth", AuthRoutes_1.default);
    app.use("/search", SearchRoutes_1.default);
    app.use("/usuarios", UsuarioRoutes_1.default);
    app.use("/roles", RolRoutes_1.default);
    app.use("/solicitudes", SolicitudRoutes_1.default);
    app.use("/paises", PaisRoutes_1.default);
    app.use("/provincias", ProvinciaRoutes_1.default);
    app.use("/localidades", LocalidadRoutes_1.default);
    // Definición del puerto que escucha el servidor
    app.listen(process.env.EXPRESS_PORT, () => {
        console.log("Server running at PORT: ", process.env.EXPRESS_PORT);
    }).on("error", (error) => {
        // Muestra de error
        throw new Error(error.message);
    });
    /*
        // insert new users for test
        await AppDataSource.manager.save(
            AppDataSource.manager.create(User, {
                firstName: "Timber",
                lastName: "Saw",
                age: 27
            })
        )
    
        await AppDataSource.manager.save(
            AppDataSource.manager.create(User, {
                firstName: "Phantom",
                lastName: "Assassin",
                age: 24
            })
        )
    */
}));
