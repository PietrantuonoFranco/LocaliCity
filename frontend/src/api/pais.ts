import api from "./api";

import type { RespuestaPaises } from "src/interfaces/RespuestasInterfaces";


const entity: string = "paises";

export const getAllPaises = () => api.get<RespuestaPaises>(entity).then(({ data }) => data);

export const getPaisById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createPais = async (nombre: string): Promise<RespuestaPaises | null> => {
  const response = await api.post<RespuestaPaises>(entity, { nombre }, {
    withCredentials: true,
    headers: { 'Content-Type': 'application/json' },
  }).then(({ data }) => data);

  console.log(response)
  if (response) return response;

  return null;
}

export const deletePais = (id: number) => api.delete(`${entity}/${id}`);