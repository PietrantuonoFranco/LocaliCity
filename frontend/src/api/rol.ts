import api from "./api";

import type { RespuestaRoles } from "src/interfaces/RespuestasInterfaces";


const entity: string = "roles";

export const getAllRoles = () => api.get<RespuestaRoles>(entity).then(({ data }) => data);

export const getRolById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createRol = ({ ...rol }) => {
    api.post(entity, rol).then(({ data }) => data);
}

export const deleteRole = (id: number) => api.delete(`${entity}/${id}`);