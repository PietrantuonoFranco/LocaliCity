import type Pais from "./entities/PaisInterface";
import type Provincia from "./entities/ProvinciaInterface";
import type Localidad from "./entities/LocalidadInterface";
import type Solicitud from "./entities/SolicitudInterface";
import type Usuario from "./entities/UsuarioInterface";
import type Rol from "./entities/RolInterface";


export interface Respuesta {
  mensaje: string;
};

export interface RespuestaAll extends Respuesta {
  paises: Pais[];
  provincias: Provincia[];
  localidades: Localidad[];
};

export interface RespuestaLocalidades extends Respuesta {
  localidades: Localidad[];
};

export interface RespuestaProvincias extends Respuesta {
  provincias: Provincia[];
};

export interface RespuestaPaises extends Respuesta {
  paises: Pais[];
};

export interface RespuestaSolicitudes extends Respuesta {
  solicitudes: Solicitud[];
};

export interface RespuestaUsuarios extends Respuesta {
  usuarios: Usuario[];
};

export interface RespuestaRoles extends Respuesta {
  roles: Rol[];
};