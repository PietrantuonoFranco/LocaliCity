import api from "./api";

import { type RespuestaPais, type RespuestaPaises, type RespuestaProvincias, type RespuestaCheckProvincias } from "src/interfaces/RespuestasInterfaces";


const entity: string = "paises";

export const getAllPaises = () => api.get<RespuestaPaises>(entity).then(({ data }) => data);

export const getPaisById = (id: number) => api.get<RespuestaPais>(`${entity}/${id}`).then(({ data }) => data);

export const getProvinciasByPaisId = (id: number) => api.get<RespuestaProvincias>(`${entity}/${id}/provincias`).then(({ data }) => data);

export const checkProvinciasByPaisId = (id: number) => api.get<RespuestaCheckProvincias>(`${entity}/${id}/tiene-provincias`).then(({ data }) => data);

export const createPais = async (nombre: string): Promise<RespuestaPais | null> => {
  const response = await api.post<RespuestaPais>(entity, { nombre }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  }).then(({ data }) => data);

  if (response) return response;

  return null;
}

export const deletePais = (id: number) => api.delete(`${entity}/${id}`);

export const updatePais = async (id: number, nombre: string): Promise<RespuestaPais | null> => {
  const response = await api.put<RespuestaPais>(`${entity}/${id}`, { nombre }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  }).then(({ data }) => data);

  if (response) return response;

  return null;
}