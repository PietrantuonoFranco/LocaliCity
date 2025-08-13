import type Solicitud from "src/interfaces/SolicitudInterface";
import api from "./api";
import type Usuario from "src/interfaces/UsuarioInterface";

const entity: string = "usuarios";

interface RespuestaUsuarios {
    mensaje: string,
    usuarios: Usuario[]
}

export const getAllUsuarios = () => api.get<RespuestaUsuarios>(entity).then(({ data }) => data);

export const getUsuarioById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createUsuario = ({ ...usuario }) => {
    api.post(entity, usuario).then(({ data }) => data);
}

export const deleteUsuario = (id: number) => api.delete(`${entity}/${id}`);

export const getSolicitudesOfUser = (id: number) => api.get<{mensaje: string, solicitudes: Solicitud[]}>(`${entity}/${id}/solicitudes`).then(({ data }) => data);