import type Pais from "src/interfaces/PaisInterface";
import type Usuario from "../interfaces/UsuarioInterface";
import api from "./api";
import type Provincia from "src/interfaces/ProvinciaInterface";

const entity: string = "solicitudes";

export const getAllSolicitudes = () => api.get(entity).then(({ data }) => data);

export const getSolicitudById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createSolicitud = async (tipo: string, nombre: string, referencia: string, mensaje: string, pais: Pais | null = null, provincia: Provincia | null = null, usuario: Usuario) => {
  const response = await api.post(entity, { tipo, nombre, referencia, mensaje, pais, provincia, usuario }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 201) return response.data;
}

export const deleteSolicitud = (id: number) => api.delete(`${entity}/${id}`);

export const updateSolicitud = async (
  id: number, 
  tipo: string | null = null,
  nombre: string | null = null,
  referencia: string | null = null,
  mensaje: string | null = null,
  pais: Pais | null = null,
  provincia: Provincia | null = null,
  estado: string | null = null,
  usuario: Usuario | null = null
) => {
  
  const response = await api.put(`${entity}/${id}`, { tipo, nombre, referencia, mensaje, pais, provincia, estado, usuario }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 200) return response.data;
}

export const aceptarSolicitud = async ( id: number ) => {
  const response = await api.put(`${entity}/aceptar/${id}`, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 200) return response.data;
}