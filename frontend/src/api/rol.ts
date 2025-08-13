import type Rol from "src/interfaces/RolInterface";
import api from "./api";

type RespuestaRoles = {
  mensaje: string;
  solicitudes: Rol[];
};

const entity: string = "roles";

export const getAllRoles = () => api.get<RespuestaRoles>(entity).then(({ data }) => data);

export const getRolById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createRol = ({ ...rol }) => {
    api.post(entity, rol).then(({ data }) => data);
}

export const deleteRole = (id: number) => api.delete(`${entity}/${id}`);