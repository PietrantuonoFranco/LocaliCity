import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv';

// Entidades
import { Rol } from "./entity/Rol"
import { Usuario } from "./entity/Usuario"
import { Pais } from "./entity/Pais"
import { Provincia } from "./entity/Provincia"
import { Localidad } from "./entity/Localidad"
import { Solicitud } from "./entity/Solicitud"

export const AppDataSource = new DataSource({
    type: "postgres",  
    host: process.env.DB_HOST || "postgres",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "db",
    synchronize: true,
    logging: true,
    entities: [ Rol, Usuario, Pais, Provincia, Localidad, Solicitud ],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => console.log("✅ Conexión a la base de datos establecida"))
    .catch((error) => console.log("❌ Error de conexión:", error));