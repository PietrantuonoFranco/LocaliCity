import type Rol from "./RolInterface";

export default interface Usuario {
    id: number,
    email: string,
    nombre: string,
    apellido: string,
    rol: Rol,
}