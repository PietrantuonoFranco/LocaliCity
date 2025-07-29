import api from "./api";

const entity: string = "localidades";

export const getAllLocalidades = () => api.get(entity).then(({ data }) => data);

export const getLocalidadById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createLocalidad = ({ ...localidad }) => {
    api.post(entity, localidad).then(({ data }) => data);
}

export const deleteLocalidad = (id: string) => api.delete(`${entity}/${id}`);