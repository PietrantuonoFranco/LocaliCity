import express from "express";
import { AppDataSource } from "./src/data-source";
import "reflect-metadata";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"

dotenv.config();

//Routes
import UsuarioRoutes from "./src/routes/UsuarioRoutes";
import RolRoutes from "./src/routes/RolRoutes";
import SolicitudRoutes from "./src/routes/SolicitudRoutes";
import PaisRoutes from "./src/routes/PaisRoutes";
import ProvinciaRoutes from "./src/routes/ProvinciaRoutes";
import LocalidadRoutes from "./src/routes/LocalidadRoutes";
import AuthRoutes from "./src/routes/AuthRoutes";


AppDataSource.initialize().then(async () => {
    // Creación de la app con ExpressJS
    const app = express();

    // Definicion de origenes permitidos
    app.use(cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));

    app.use(cookieParser());
    app.use(express.json());

    // Definicion de las rutas
    app.use("/auth", AuthRoutes);
    app.use("/usuarios", UsuarioRoutes);
    app.use("/roles", RolRoutes);
    app.use("/solicitudes", SolicitudRoutes);
    app.use("/paises", PaisRoutes);
    app.use("/provincias", ProvinciaRoutes);
    app.use("/localidades", LocalidadRoutes);

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
})