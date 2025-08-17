import api from "./api";

import type { RespuestaPais, RespuestaPaises } from "src/interfaces/RespuestasInterfaces";


const entity: string = "paises";

export const getAllPaises = () => api.get<RespuestaPaises>(entity).then(({ data }) => data);

export const getPaisById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createPais = async (nombre: string): Promise<RespuestaPais | null> => {
  const response = await api.post<RespuestaPais>(entity, { nombre }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  }).then(({ data }) => data);

  if (response) return response;

  return null;
}

export const deletePais = (id: number) => api.delete(`${entity}/${id}`);