import api from "./api";

import type {
  RespuestaAll,
  RespuestaPaises,
  RespuestaProvincias,
  RespuestaLocalidades
} from "src/interfaces/RespuestasInterfaces";


const entity: string = "search";

export const getAllByWord = (palabra: string) => api.get<RespuestaAll>(`${entity}/all/${palabra}`).then(({ data }) => data);

export const getPaisesByWord = (palabra: string) => api.get<RespuestaPaises>(`${entity}/paises/${palabra}`).then(({ data }) => data);

export const getProvinciasByWord = (palabra: string) => api.get<RespuestaProvincias>(`${entity}/provincias/${palabra}`).then(({ data }) => data);

export const getLocalidadesByWord = (palabra: string) => api.get<RespuestaLocalidades>(`${entity}/localidades/${palabra}`).then(({ data }) => data);