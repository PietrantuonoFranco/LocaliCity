import "reflect-metadata"
import { DataSource } from "typeorm"
import 'dotenv';

export const AppDataSource = new DataSource({
    type: "postgres",  
    host: process.env.DB_HOST || "postgres",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "user",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "db",
    synchronize: true,
    logging: true,
    entities: [],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
    .then(() => console.log("✅ Conexión a la base de datos establecida"))
    .catch((error) => console.log("❌ Error de conexión:", error));