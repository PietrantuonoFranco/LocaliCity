├── backend/            # Directorio que contiene la lógica del backend de la aplicación
├── docs/               # Directorio que contiene los archivos de la documentación principal de la aplicación 
├── frontend/           # Directorio que contiene la lógica del frontend de la aplicación
├── nginx/              # Directorio que contiene la configuración de Nginx
├── .env                # Variables de entorno (credenciales DB, puertos, claves secretas)
├── .gitignore          # Archivos y carpetas a ignorar en Git
├── compose.build.yaml  # Configuración de Docker Compose para build (ej: levantar backend + base de datos + frontend en contenedores)
├── compose.yaml        # Configuración de Docker Compose (levantar compose.build.yaml + Nginx)
├── LICENSE             # Licencia del proyecto (permisos y condiciones de uso/distribución)
├── README.md           # Documentación principal del proyecto: descripción, instalación, uso y despliegue
└── Tree.md             # Este archivo