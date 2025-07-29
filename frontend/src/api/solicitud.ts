import api from "./api";

const entity: string = "solicitudes";

export const getAllSolicitudes = () => api.get(entity).then(({ data }) => data);

export const getSolicitudById = (id: number) => api.get(`${entity}/${id}`).then(({ data }) => data);

export const createSolicitud = ({ ...solicitud }) => {
    api.post(entity, solicitud).then(({ data }) => data);
}

export const deleteSolicitud = (id: string) => api.delete(`${entity}/${id}`);