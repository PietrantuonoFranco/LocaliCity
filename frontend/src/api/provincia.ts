import type Pais from "src/interfaces/entities/PaisInterface";
import api from "./api";

import type { RespuestaProvincia, RespuestaProvincias } from "src/interfaces/RespuestasInterfaces";


const entity: string = "provincias";

export const getAllProvincias = () => api.get<RespuestaProvincias>(entity).then(({ data }) => data);

export const getProvinciaById = (id: number) => api.get<RespuestaProvincia>(`${entity}/${id}`).then(({ data }) => data);

export const createProvincia = async (nombre: string, pais: Pais): Promise<RespuestaProvincia | null> => {
  const response = await api.post<RespuestaProvincia>(entity, { nombre, pais }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  }).then(({ data }) => data);
  
  if (response) return response;
  
  return null;
}

export const deleteProvincia = (id: number) => api.delete(`${entity}/${id}`);

export const updateProvincia = async (id: number, nombre: string | null = null, pais: Pais | null = null): Promise<RespuestaProvincia | null> => {
  const response = await api.put<RespuestaProvincia>(`${entity}/${id}`, { nombre, pais }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  }).then(({ data }) => data);

  if (response) return response;

  return null;
}