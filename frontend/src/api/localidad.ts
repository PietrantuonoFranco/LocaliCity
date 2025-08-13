import type Localidad from "src/interfaces/LocalidadInterface";
import api from "./api";


type RespuestaLocalidades = {
  mensaje: string;
  localidades: Localidad[];
};

const entity: string = "localidades";

export const getAllLocalidades = () => api.get<RespuestaLocalidades>(entity).then(({ data }) => data);

export const getLocalidadById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createLocalidad = ({ ...localidad }) => {
    api.post(entity, localidad).then(({ data }) => data);
}

export const deleteLocalidad = (id: number) => api.delete(`${entity}/${id}`);