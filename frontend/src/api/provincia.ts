import api from "./api";

const entity: string = "provincias";

export const getAllProvincias = () => api.get(entity).then(({ data }) => data);

export const getProvinciaById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createProvincia = ({ ...provincia }) => {
    api.post(entity, provincia).then(({ data }) => data);
}

export const deleteProvincia = (id: string) => api.delete(`${entity}/${id}`);