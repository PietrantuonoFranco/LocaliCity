frontend/
├── src/                                # Código fuente principal del frontend
│   ├── api/                            # Módulos para centralizar las peticiones HTTP al backend
│   │   ├── api.ts                      # Configuración de Axios (baseURL, interceptores, headers)
│   │   └── ...                         # Otros módulos para distintas entidades (usuarios, países, solicitudes, etc.)
│   ├── assets/                         # Archivos estáticos (imágenes, íconos, fuentes, etc.)
│   ├── components/                     # Componentes reutilizables de la interfaz
│   │   ├── astro/                      # Componentes desarrollados en Astro
│   │   │   │   ├── Header.astro        # Componente que define la estructura y lógica del encabezado
│   │   │   │   └── Layout.astro        # Componente que define la estructura y lógica del layout de la página
│   │   └── react/                      # Componentes desarrollados en React para interactividad avanzada
│   │       ├── cuenta/                 # Componentes relacionados al panel de usuario
│   │       ├── header/                 # Componentes relacionados con el encabezado
│   │       ├── home/                   # Componentes específicos de la página de inicio
│   │       ├── localidades/            # Componentes para la gestión de localidades
│   │       ├── paises/                 # Componentes para la gestión de países
│   │       ├── provincias/             # Componentes para la gestión de provincias
│   │       ├── solicitudes/            # Componentes para la gestión de solicitudes
│   │       ├── usuarios/               # Componentes para la gestión de usuarios
│   │       ├── OptionSelect.tsx        # Componente React genérico para selects dinámicos
│   │       └── SearchBar.tsx           # Componente de búsqueda reutilizable en distintas vistas
│   ├── interfaces/                     # Definiciones de tipos e interfaces en TypeScript
│   │   ├── entities/                   # Interfaces para las entidades principales (Usuario, País, Provincia, etc.)
│   │   ├── OptionInterface.ts          # Tipado para opcion
│   │   └── RespuestasInterfaces.ts     # Tipado de respuestas de la API (estructura de los datos recibidos)
│   ├── pages/                          # Páginas principales de la aplicación (enrutamiento de Astro)
│   │   ├── cuenta/                     # Vistas relacionadas a la cuenta de usuario
│   │   ├── iniciar-sesion/             # Página de inicio de sesión
│   │   ├── localidades/                # Páginas del módulo de localidades
│   │   ├── paises/                     # Páginas del módulo de países
│   │   ├── provincias/                 # Páginas del módulo de provincias
│   │   ├── registrarse/                # Página de registro de usuario
│   │   ├── solicitudes                 # Páginas para gestionar solicitudes
│   │   │   ├── crear/                  # Página para crear nuevas solicitudes
│   │   │   └── editar/                 # Página para editar solicitudes existentes
│   │   ├── usuarios/                   # Páginas del módulo de usuarios
│   │   │   ├── crear/                  # Página para crear un nuevo usuario
│   │   │   └── editar/                 # Página para editar un usuario existente
│   │   └── index.astro                 # Página de inicio de la aplicación
│   └── styles/                         # Directorio para guardar archivos de estilos CSS
│       └── global.css                  # Estilos globales de la aplicación (TailwindCSS y reglas personalizadas)
├── .astro/                             # Archivos temporales y de compilación generados por Astro (no se editan manualmente)
├── .dockerignore                       # Archivos y carpetas a excluir en el build de Docker
├── .env                                # Variables de entorno (puertos, claves secretas)
├── .gitignore                          # Archivos y carpetas a ignorar en Git
├── astro.config.mjs                    # Configuración principal de Astro (integraciones, adaptadores, paths)
├── compose.yaml                        # Configuración de Docker Compose (ej: levantar frontend)
├── Dockerfile                          # Instrucciones para construir la imagen Docker del frontend
├── package-lock.json                   # Archivo generado con las versiones exactas de dependencias (`npm`)
├── package.json                        # Metadata del proyecto y listado de dependencias/script
├── README.Docker.md                    # Guía de uso del proyecto con Docker (build de la imagen, ejecución con Compose, variables necesarias)
├── README.md                           # Guía de uso del proyecto (ejecución en local mediante `npm`, información extra, etc)
├── Tree.md                             # Este archivo
└── tsconfig.json                       # Configuración del compilador de TypeScript para este proyecto