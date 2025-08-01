import type Usuario from "../interfaces/UsuarioInterface";
import api from "./api";

const entity: string = "solicitudes";

export const getAllSolicitudes = () => api.get(entity).then(({ data }) => data);

export const getSolicitudById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createSolicitud = async (tipo: string, nombre: string, referencia: string, mensaje: string, pais: string | null = null, provincia: string | null = null, usuario: Usuario) => {
  if (pais === '') pais = null;
  if (provincia === '') provincia = null;
  
  const response = await api.post(entity, { tipo, nombre, referencia, mensaje, pais, provincia, usuario }, {
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  if (response.status === 201) return response.data  
}

export const deleteSolicitud = (id: string) => api.delete(`${entity}/${id}`);