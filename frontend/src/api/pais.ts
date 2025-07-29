import api from "./api";

const entity: string = "paises";

export const getAllPaises = () => api.get(entity).then(({ data }) => data);

export const getPaisById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createPais = ({ ...pais }) => {
    api.post(entity, pais).then(({ data }) => data);
}

export const deletePais = (id: string) => api.delete(`${entity}/${id}`);