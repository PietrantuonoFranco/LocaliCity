import type Provincia from "src/interfaces/entities/ProvinciaInterface";
import api from "./api";

import type { RespuestaLocalidad, RespuestaLocalidades } from "src/interfaces/RespuestasInterfaces";


const entity: string = "localidades";

export const getAllLocalidades = () => api.get<RespuestaLocalidades>(entity).then(({ data }) => data);

export const getLocalidadById = (id: number) => api.get<RespuestaLocalidad>(`${entity}/${id}`).then(({ data }) => data);

export const createLocalidad = async (nombre: string, provincia: Provincia,): Promise<RespuestaLocalidad | null> => {
    const response = await api.post<RespuestaLocalidad>(entity, { nombre, provincia }, {
      withCredentials: true,
      headers: { 'Content-Type': 'application/json' },
    }).then(({ data }) => data);
    
    if (response) return response;
    
    return null;
}

export const deleteLocalidad = (id: number) => api.delete(`${entity}/${id}`);

export const updateLocalidad = async (id: number, nombre: string | null = null, provincia: Provincia | null = null): Promise<RespuestaLocalidad | null> => {
  const response = await api.put<RespuestaLocalidad>(`${entity}/${id}`, { nombre, provincia }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  }).then(({ data }) => data);

  if (response) return response;

  return null;
}