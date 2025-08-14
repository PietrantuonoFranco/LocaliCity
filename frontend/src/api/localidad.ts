import api from "./api";

import type { RespuestaLocalidades } from "src/interfaces/RespuestasInterfaces";


const entity: string = "localidades";

export const getAllLocalidades = () => api.get<RespuestaLocalidades>(entity).then(({ data }) => data);

export const getLocalidadById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createLocalidad = ({ ...localidad }) => {
    api.post(entity, localidad).then(({ data }) => data);
}

export const deleteLocalidad = (id: number) => api.delete(`${entity}/${id}`);