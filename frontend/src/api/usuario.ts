import api from "./api";

const entity: string = "usuarios";

export const getAllUsuarios = () => api.get(entity).then(({ data }) => data);

export const getUsuarioById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createUsuario = ({ ...usuario }) => {
    api.post(entity, usuario).then(({ data }) => data);
}

export const deleteUsuario = (id: string) => api.delete(`${entity}/${id}`);