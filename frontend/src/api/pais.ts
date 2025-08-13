import api from "./api";
import type Pais from "src/interfaces/PaisInterface";

type RespuestaPaises = {
  mensaje: string;
  paises: Pais[];
};

const entity: string = "paises";

export const getAllPaises = () => api.get<RespuestaPaises>(entity).then(({ data }) => data);

export const getPaisById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createPais = ({ ...pais }) => {
    api.post(entity, pais).then(({ data }) => data);
}

export const deletePais = (id: number) => api.delete(`${entity}/${id}`);