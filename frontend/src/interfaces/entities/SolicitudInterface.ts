import type Pais from "./PaisInterface";
import type Provincia from "./ProvinciaInterface";
import type Usuario from "./UsuarioInterface";
import type Localidad from "../entities/LocalidadInterface";

export default interface Solicitud {
    id: number,
    tipo: string,
    nombre: string,
    mensaje: string,
    referencia: string,
    estado: string,
    usuario: Usuario,
    pais: Pais | null,
    provincia: Provincia | null,
    localidad: Localidad | null
}