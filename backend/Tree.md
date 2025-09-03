```md
backend
├── dist/               # Código compilado de TypeScript a JavaScript listo para producción
├── src/                # Código fuente principal del proyecto
│   ├── controller/     # Reciben las requests y devuelven responses
│   ├── entity/         # Entidades TypeORM (mapeo a tablas)
│   ├── middleware/     # Autenticación, logging, validaciones
│   ├── migrations/     # Archivos de migraciones generados por TypeORM para versionar cambios en la BD
│   ├── routes/         # Definición de rutas y endpoints
│   ├── seed/           # Scripts para inicializar datos en la base (ej: usuarios por defecto, localizaciones iniciales)
│   ├── types/          # Definiciones de tipos e interfaces de TypeScript (para reforzar tipado en el proyecto)
│   ├── data-source.ts  # Configuración principal de TypeORM
│   └── tsconfig.json   # Configuración del compilador de TypeScript para este proyecto
├── .dockerignore       # Archivos y carpetas a excluir en el build de Docker
├── .env                # Variables de entorno (credenciales DB, puertos, claves secretas)
├── .gitignore          # Archivos y carpetas a ignorar en Git
├── compose.yaml        # Configuración de Docker Compose (ej: levantar backend + base de datos en contenedores)
├── Dockerfile          # Instrucciones para construir la imagen de Docker del backend
├── index.ts            # Configuración principal de Express
├── package-lock.json   # Bloqueo de versiones exactas de dependencias (generado por npm)
├── package.json        # Metadata del proyecto y listado de dependencias/scripts
├── README.Docker.md    # Guía de uso del proyecto con Docker (build de la imagen, ejecución con Compose, variables necesarias)
└── Tree.md             # Este archivo
```