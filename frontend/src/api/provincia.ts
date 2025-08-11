import api from "./api";
import type Provincia from "src/interfaces/ProvinciaInterface";

type RespuestaPaises = {
  mensaje: string;
  provincias: Provincia[];
};

const entity: string = "provincias";

export const getAllProvincias = () => api.get<RespuestaPaises>(entity).then(({ data }) => data);

export const getProvinciaById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createProvincia = ({ ...provincia }) => {
    api.post(entity, provincia).then(({ data }) => data);
}

export const deleteProvincia = (id: string) => api.delete(`${entity}/${id}`);