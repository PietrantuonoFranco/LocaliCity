import api from "./api";

const entity: string = "roles";

export const getAllRoles = () => api.get(entity).then(({ data }) => data);

export const getRolById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createRol = ({ ...rol }) => {
    api.post(entity, rol).then(({ data }) => data);
}

export const deleteRole = (id: string) => api.delete(`${entity}/${id}`);