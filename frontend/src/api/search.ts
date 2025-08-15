import api from "./api";

import type {
  RespuestaAll,
  RespuestaPaises,
  RespuestaProvincias,
  RespuestaLocalidades,
  RespuestaSolicitudes,
  RespuestaUsuarios
} from "src/interfaces/RespuestasInterfaces";


const entity: string = "search";

export const getAllByWord = async (palabra: string) => await api.get<RespuestaAll>(`${entity}/all/${palabra}`).then(({ data }) => data);

export const getPaisesByWord = (palabra: string) => api.get<RespuestaPaises>(`${entity}/paises/${palabra}`).then(({ data }) => data);


export const getProvinciasByWord = (palabra: string) => api.get<RespuestaProvincias>(`${entity}/provincias/${palabra}`).then(({ data }) => data);

export const getLocalidadesByWord = (palabra: string) => api.get<RespuestaLocalidades>(`${entity}/localidades/${palabra}`).then(({ data }) => data);

export const getUsuariosByWord = (palabra: string) => api.get<RespuestaUsuarios>(`${entity}/usuarios/${palabra}`).then(({ data }) => data);

export const getSolicitudesByWord = (palabra: string) => api.get<RespuestaSolicitudes>(`${entity}/solicitudes/${palabra}`).then(({ data }) => data);

export const getSolicitudesOfUsuarioByWord = (id: number, palabra: string) => {
  const response = api.get<RespuestaSolicitudes>(`${entity}/solicitudes/usuario/${id}/${palabra}`).then(({ data }) => data);

  console.log(response) 

  return response
}