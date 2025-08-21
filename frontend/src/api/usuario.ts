import api from "./api";

import type { RespuestaSolicitudes, RespuestaUsuario, RespuestaUsuarios } from "src/interfaces/RespuestasInterfaces";
import type Rol from "src/interfaces/entities/RolInterface";


const entity: string = "usuarios";

export const getAllUsuarios = () => api.get<RespuestaUsuarios>(entity).then(({ data }) => data);

export const getUsuarioById = (id: number) => api.get<RespuestaUsuario>(`${entity}/${id}`).then(({ data }) => data);

export const createUsuario = async (email: string, nombre: string, apellido: string, contrasenia: string, rol: Rol): Promise<RespuestaUsuario | null > => {
    const response = await api.post<RespuestaUsuario>(entity, {email, nombre, apellido, contrasenia, rol}).then(({ data }) => data);

    return response ? response : null;
}

export const deleteUsuario = (id: number) => api.delete(`${entity}/${id}`);

export const getSolicitudesOfUser = (id: number) => api.get<RespuestaSolicitudes>(`${entity}/${id}/solicitudes`).then(({ data }) => data);

export const updateUsuario = async (id: number, email: string | null = null, nombre: string | null = null, apellido: string | null = null, contrasenia: string | null = null, rol: Rol | null = null): Promise<RespuestaUsuario | null > => {
    const response = await api.put<RespuestaUsuario>(`${entity}/${id}`, {email, nombre, apellido, contrasenia, rol}).then(({ data }) => data);

    return response ? response : null;
}