<img width="1243" height="336" alt="LocaliCity Logo" src="https://github.com/user-attachments/assets/81cd0e36-c6fc-466e-8f5d-62cfddcd9d50" />

---

La idea de mi proyecto surgió mientras trabajaba en otro desarrollo personal por hobbie. En uno de sus formularios era necesario ingresar país, provincia y ciudad. El desafío aparecía al intentar resolver la lógica de dependencias: elegir un país, luego mostrar sus provincias y, finalmente, seleccionar una ciudad de la provincia elegida.
Para resolverlo pensé en dos opciones. La primera era guardar toda esa información en mi propia base de datos, lo cual resultaba demasiado costoso en tiempo y recursos. La segunda fue buscar APIs externas que ofrecieran estos datos. Sin embargo, aunque encontré algunas alternativas, la mayoría no disponía de planes gratuitos o, en su versión gratuita, no eran realmente útiles para mi caso.

A partir de esta problemática nació la idea de desarrollar un sistema propio que proporcione información de países, provincias y ciudades. Además, quise sumar una funcionalidad clave: permitir que los usuarios puedan solicitar la incorporación de nuevas locaciones. Dichas solicitudes quedarían pendientes de revisión por un administrador, quien decidiría si aprobarlas (creando la entidad en el sistema) o rechazarlas. De esta forma, la base de datos se enriquecería de manera colaborativa y escalable, evitando la necesidad de investigar continuamente nuevas ubicaciones.

Así fue como nació **`LocaliCity`**: un proyecto pensado para simplificar y democratizar el acceso a datos geográficos estructurados.

## ¿Cómo ejecuto la aplicación?
Para ejecutar la aplicación, primero debemos crear en la raíz del proyecto y en el directorio **`/backend`** un archivo llamado **`.env`**, el cual debe tener una estructura como la siguiente:

```env
#_________NodeJS__________
NODE_ENV=production

#________ExpressJS________
EXPRESS_PORT=3000


#__________CORS___________
CORS_ORIGIN=http://tu-dominio.com


#______JsonWebToken_______
JWT_SECRET=tu-jwt-secreto


#_________TypeORM_________
DB_USER=usuario
DB_PASSWORD=contraseña
DB_NAME=localicity

POSTGRES_USER=usuario
POSTGRES_PASSWORD=contraseña
POSTGRES_DB=localicity
POSTGRES_PORT=5432


#_________Bcrypt__________
SALT_ROUNDS=5
```

Posteriormente pasamos a la ejecución, la cual podemos realizar de dos maneras:

### a. Docker
1. Para correr nuestra aplicación mediante este método, debemos tener previamente instalado **`Docker`** en nuestro dispositivo, por lo que en caso de no tenerlo, dirigite al siguiente enlace y seguí los pasos para instalarlo: https://docs.docker.com/get-started/get-docker/

2. Una vez tengamos Docker instalado, ejecutamos el siguiente comando para levantar los 3 servicios (frontend, backend y la base de datos):

		docker compose up --build

	Esto creará un contenedor llamado **`localicity`** con 3 contenedores dentro llamados **`astro-1`**, **`api-1`** y **`db-1`**.

3. Para poder abrir la aplicación, esperamos a que haya finalizado el proceso de iniciación y nos dirigimos a la siguiente URL en nuestro navegador: http://localhost:4321

### b. Manual

1. Si no queremos utilizar **`Docker`**, podemos ejecutar localmente la aplicación, aunque necesitaremos tener instalado con anteriormente:
   - **`PostgresSQL`**
   - **`NodeJS`**

En caso de no tenerlos intalados, los podemos instalar siguiendo su documentación de instalación oficial:
   - **`PostgresSQL`**: https://www.postgresql.org/download/
   - **`NodeJS`**: https://nodejs.org/en/download
2. Una vez instalados, copiá el siguiente script en la raíz del proyecto:

```bash
#!/bin/bash

# Ejecutar la aplicación del backend
cd backend
npm run start

echo "API levantada con éxito"

# Ejecutar la aplicación del frontend
cd ../frontend
npm run dev


echo "Frontend levantado con éxito"
```

> **📝 Nota:** Recordá que tal vez necesites asignar permisos de ejecución para dicho script, por lo que deberás asignarselos mediante el siguiente comando:
> ```bash
>chmod +x <nombre-de-tu-script>.sh
>```

3. Ejecutamos el script mediante el siguiente comando:
```bash
./<nombre-de-tu-script>.sh
```
