import api from "./api";

import type { RespuestaSolicitudes, RespuestaUsuarios } from "src/interfaces/RespuestasInterfaces";


const entity: string = "usuarios";

export const getAllUsuarios = () => api.get<RespuestaUsuarios>(entity).then(({ data }) => data);

export const getUsuarioById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createUsuario = ({ ...usuario }) => {
    api.post(entity, usuario).then(({ data }) => data);
}

export const deleteUsuario = (id: number) => api.delete(`${entity}/${id}`);

export const getSolicitudesOfUser = (id: number) => api.get<RespuestaSolicitudes>(`${entity}/${id}/solicitudes`).then(({ data }) => data);