import "reflect-metadata"
import { DataSource } from "typeorm"
import dotenv from "dotenv"

// Entidades
import { Rol } from "./entity/Rol"
import { Usuario } from "./entity/Usuario"
import { Pais } from "./entity/Pais"
import { Provincia } from "./entity/Provincia"
import { Localidad } from "./entity/Localidad"
import { Solicitud } from "./entity/Solicitud"

dotenv.config();


export const AppDataSource = new DataSource({
    type: "postgres",  
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: false,
    entities: [ Rol, Usuario, Pais, Provincia, Localidad, Solicitud ],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => console.log("✅ Conexión a la base de datos establecida"))
    .catch((error) => console.log("❌ Error de conexión:", error));